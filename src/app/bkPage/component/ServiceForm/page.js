'use client';

import { useState } from "react";
import axios from "axios";

const ServiceForm = ({ fetchServices }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://barber-backend-1-9uij.onrender.com/api/services", {
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10), // Explicit base 10 for parsing
      });
      if (fetchServices) {
        fetchServices(); // Call fetchServices if it's passed as a prop
      }
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Add New Service</h2>
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Duration (in minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;
