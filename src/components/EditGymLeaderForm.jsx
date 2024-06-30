// EditGymLeaderForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditGymLeaderForm = ({ gymLeaderId }) => {
  const [gymLeader, setGymLeader] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGymLeaderById(gymLeaderId);
  }, [gymLeaderId]);

  const fetchGymLeaderById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:6969/api/pokedex/gymleaders/edit/${id}`);
      setGymLeader(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gym leader:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGymLeader({ ...gymLeader, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:6969/api/pokedex/gymleaders/edit/${gymLeader._id}`, gymLeader);
      console.log('Gym leader updated successfully!');
      // Optionally, redirect or update state to reflect the update
    } catch (error) {
      console.error('Error updating gym leader:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={gymLeader.name} onChange={handleInputChange} required />

      <label>Gym:</label>
      <input type="text" name="gym" value={gymLeader.gym} onChange={handleInputChange} required />

      <label>Badge:</label>
      <input type="text" name="badge" value={gymLeader.badge} onChange={handleInputChange} required />

      <label>Description:</label>
      <textarea name="description" value={gymLeader.description} onChange={handleInputChange} required />

      <button type="submit">Update Gym Leader</button>
    </form>
  );
};

export default EditGymLeaderForm;
