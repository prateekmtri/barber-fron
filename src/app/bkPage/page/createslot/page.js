"use client";

import React, { useState, useEffect } from "react";

const CreateSlot = () => {
  const [time, setTime] = useState("");
  const [barberId, setBarberId] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch barbers from backend
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await fetch("https://barber-backend-1-9uij.onrender.com/api/barbers");
        const data = await response.json();
        setBarbers(data.barbers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching barbers:", error);
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  const handleCreateSlot = async () => {
    try {
      const response = await fetch("https://barber-backend-1-9uij.onrender.com/api/slots/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time, barberId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Slot created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  if (loading) {
    return <div>Loading barbers...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create a Slot</h1>
      <input
        type="text"
        placeholder="Enter Time (e.g., 10:00 AM)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 mb-4 block w-full"
      />
      <select
        value={barberId}
        onChange={(e) => setBarberId(e.target.value)}
        className="border p-2 mb-4 block w-full"
      >
        <option value="">Select Barber</option>
        {barbers.length > 0 ? (
          barbers.map((barber) => (
            <option key={barber._id} value={barber._id}>
              {barber.name}
            </option>
          ))
        ) : (
          <option>No barbers available</option>
        )}
      </select>
      <button
        onClick={handleCreateSlot}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Slot
      </button>
    </div>
  );
};

export default CreateSlot;
