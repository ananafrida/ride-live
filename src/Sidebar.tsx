// import React, { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "../convex/_generated/api";
// import './Sidebar.css';

// const Sidebar: React.FC = () => {
//   // State to store form inputs
//   const [formData, setFormData] = useState({
//     destination: "",
//     tripType: "",
//     budget: "",
//     description: "",
//   });

//   // State to handle feedback for submission
//   const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

//   // Create a mutation for inserting user inputs
//   const insertUserInput = useMutation(api.userInputs.insertUserInput);

//   // Handle form input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Insert the data using the mutation
//       await insertUserInput(formData);
//       // Provide feedback and reset the form
//       setFeedbackMessage("Form submitted successfully!");
//       setFormData({
//         destination: "",
//         tripType: "",
//         budget: "",
//         description: "",
//       });
//     } catch (error) {
//       setFeedbackMessage("Error submitting the form.");
//       console.error("Failed to submit form: ", error);
//     }
//   };

//   return (
//     <div className="sidebar">
//       <h2>Plan Your Trip</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="destination">Destination: </label>
//           <input
//             type="text"
//             id="destination"
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="tripType">Trip Type: </label>
//           <select
//             id="tripType"
//             name="tripType"
//             value={formData.tripType}
//             onChange={handleChange}
//           >
//             <option value="">Select trip type</option>
//             <option value="adventure">Adventure</option>
//             <option value="relaxation">Relaxation</option>
//             <option value="scenic">Scenic</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="budget">Budget: </label>
//           <input
//             type="number"
//             id="budget"
//             name="budget"
//             value={formData.budget}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description: </label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>

//       {/* Feedback message to inform the user about submission */}
//       {feedbackMessage && <p>{feedbackMessage}</p>}
//     </div>
//   );
// };
import React, { useState } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api'; // Adjust the import path

const Sidebar: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [locations, setLocations] = useState<{ lat: number; lng: number; locationName: string }[]>([]);

  // Call the Convex Action to generate coordinates
  const generateCoordinates = useAction(api.generateCoor.generateCoor); 

  // Call the Convex Mutation to insert coordinates into the database
  const insertCoor = useMutation(api.insertCoor.insertCoor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    try {
      // Step 1: Generate coordinates based on user input
      const coordinates = await generateCoordinates({ userInput });

      // Step 2: Set the generated locations to state for display
      setLocations(coordinates);

      // Step 3: Insert the generated coordinates into the 'locations2' table
      await insertCoor({ coordinates });

      console.log('Coordinates inserted successfully');
    } catch (error) {
      console.error('Error generating or inserting coordinates:', error);
    }
  };

  return (
    <div>
      <h2>Generate Travel Locations</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your travel preferences..."
          required
        />
        <button type="submit">Generate Locations</button>
      </form>

      {locations.length > 0 && (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location.locationName}: {location.lat}, {location.lng}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
