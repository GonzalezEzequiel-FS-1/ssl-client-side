import React, { useState } from 'react';
import styled from 'styled-components';
import { searchByName, deleteByName, getAll } from '../services/calls'; // Adjust import path as per your file structure

const AddEditGymLeader = () => {
  const [name, setName] = useState('');
  const [gym, setGym] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement your API call for adding/editing gym leader here
    // Example:
    // try {
    //   await addGymLeader({ name, gym, badge, description });
    //   // Optionally, clear the form or show a success message
    // } catch (error) {
    //   console.error('Error adding/editing gym leader:', error);
    // }
  };

  return (
    <FormContainer>
      <h2>Add / Edit Gym Leader</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel>Name:</InputLabel>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <InputLabel>Gym:</InputLabel>
        <input type="text" value={gym} onChange={(e) => setGym(e.target.value)} required />
        <InputLabel>Badge:</InputLabel>
        <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} required />
        <InputLabel>Description:</InputLabel>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};

export default AddEditGymLeader;

const FormContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
`;

const InputLabel = styled.label`
  margin-top: 10px;
  display: block;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
`;
