import { mutation } from './_generated/server';

export const insertCoord = mutation(async ({ db }, { coordinates }: { coordinates: { locationName: string; lat: number; lng: number }[] }) => {
  try {
    for (const location of coordinates) {
      await db.insert('locations2', {
        locationName: location.locationName,
        latitude: location.lat,
        longitude: location.lng,
      });
      console.log(`Inserted ${location.locationName} into locations2 table`);
    }
  } catch (error) {
    console.error('Error inserting coordinates:', error);
    throw new Error('Failed to insert location coordinates');
  }
});
