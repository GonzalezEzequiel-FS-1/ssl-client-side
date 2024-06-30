import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UpdateGymLeaderForm = ({ leader, onUpdate }) => {
  const [name, setName] = useState('');
  const [gym, setGym] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (leader) {
      setName(leader.name || '');
      setGym(leader.gym || '');
      setBadge(leader.badge || '');
      setDescription(leader.description || '');
      setLoading(false); // Set loading to false once data is loaded
    }
  }, [leader]); // Ensure useEffect runs when leader changes

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedLeader = {
      _id: leader._id, // Ensure _id is included in the update object
      name,
      gym,
      badge,
      description,
    };
    onUpdate(updatedLeader); // Pass updated leader object to parent component for update
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>; // Show loading indicator while fetching data
  }

  return (
    <Container>
      <h2>Update Gym Leader: {leader.name}</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Label>
        <Label>
          Gym:
          <Input
            type="text"
            value={gym}
            onChange={(e) => setGym(e.target.value)}
            required
          />
        </Label>
        <Label>
          Badge:
          <Input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            required
          />
        </Label>
        <Label>
          Description:
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Label>
        <SubmitButton type="submit">Update Leader</SubmitButton>
      </Form>
    </Container>
  );
};

export default UpdateGymLeaderForm;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 5px;
`;

const Textarea = styled.textarea`
  padding: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
