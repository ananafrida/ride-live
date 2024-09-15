import { action } from './_generated/server';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Location {
  locationName: string;
  lat: number;
  lng: number;
}

// Helper function to clean the location name
const extractLocationName = (locationDescription: string): string => {
  const match = locationDescription.match(/^\d+\.\s*(.*?)\s*:/); // Extract before ":"
  return match ? match[1] : locationDescription.split(':')[0];
};

// Helper function to fetch place coordinates from the Google Places API
const getPlaceCoordinates = async (placeName: string, googleMapsApiKey: string): Promise<Location | null> => {
  try {
    console.log(`Fetching coordinates for ${placeName} from Places API...`);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          input: placeName,
          inputtype: 'textquery',
          fields: 'geometry,name',
          key: googleMapsApiKey,
        },
      }
    );

    if (!response.data.candidates || !response.data.candidates[0]) {
      throw new Error('No place found');
    }

    const { lat, lng } = response.data.candidates[0].geometry.location;

    console.log(`Coordinates for ${placeName}:`, { lat, lng });

    return {
      locationName: placeName,
      lat,
      lng,
    };
  } catch (error) {
    console.error('Error fetching place data for', placeName, error);
    return null;
  }
};

export const generateCoor = action(async ({}, { userInput }: { userInput: string }) => {
  try {
    console.log('Generating locations for input:', userInput);

    // Step 1: Call OpenAI API with the correct chat completion endpoint
    const openAIResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a travel assistant who suggests travel locations based on user preferences.',
        },
        {
          role: 'user',
          content: `Generate a list of relevant locations for a trip with these details:
          ${userInput}`,
        },
      ],
      max_tokens: 150,
    });

    const messageContent = openAIResponse.choices?.[0]?.message?.content;
    if (!messageContent) {
      throw new Error('No content returned from OpenAI');
    }

    const locationDescriptions: string[] = messageContent
      .trim()
      .split('\n')
      .filter((desc: string) => desc.length > 0);

    const locationNames: string[] = locationDescriptions.map(extractLocationName);

    console.log('Clean location names for geocoding:', locationNames);

    // Ensure googleMapsApiKey is defined
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!googleMapsApiKey) {
      throw new Error('Google Maps API key is not set in the environment.');
    }

    const locationCoordinates = await Promise.all(
      locationNames.map(async (locationName: string): Promise<Location | null> => {
        return getPlaceCoordinates(locationName, googleMapsApiKey); // Using Places API
      })
    );

    const validCoordinates: Location[] = locationCoordinates.filter(
      (coords): coords is Location => coords !== null
    );

    console.log('Valid coordinates:', validCoordinates);

    return validCoordinates; // Return the coordinates to be inserted via mutation
  } catch (error) {
    console.error('Error generating locations:', error);
    throw new Error('Failed to generate location coordinates');
  }
});
