import React, { useState } from "react";
import './Sidebar.css'

// Sidebar component
const Sidebar: React.FC = () => {
  // State to store form inputs
  const [formData, setFormData] = useState({
    destination: "",
    tripType: "",
    budget: "",
    description: "",
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User input: ", formData);
    // You can perform additional actions like sending data to a server or API here.
  };

  return (
    <div className="sidebar">
      <h2>Plan Your Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">Destination: </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tripType">Trip Type: </label>
          <select id="tripType" name="tripType" value={formData.tripType} onChange={handleChange}>
            <option value="">Select trip type</option>
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="scenic">Scenic</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget: </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">description: </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sidebar;
