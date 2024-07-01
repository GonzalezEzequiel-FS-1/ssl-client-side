import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAll, deleteByName } from '../services/calls';
import SearchGymLeaders from './SearchGymLeaders'; // Import the Search component

const GymLeadersList = () => {
  const [gymLeaders, setGymLeaders] = useState([]);
  const [filteredLeaders, setFilteredLeaders] = useState([]);

  useEffect(() => {
    fetchGymLeaders();
  }, []);

  const fetchGymLeaders = async () => {
    try {
      const data = await getAll();
      setGymLeaders(data);
      setFilteredLeaders(data);
    } catch (error) {
      console.error('Error fetching gym leaders:', error);
    }
  };

  const handleDelete = async (name) => {
    try {
      await deleteByName(name);
      fetchGymLeaders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting gym leader:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = gymLeaders.filter((leader) =>
      leader.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeaders(filtered);
  };

  return (
    <Container>
      <SearchGymLeaders onSearch={handleSearch} />
      {filteredLeaders.map((leader) => (
        <GymLeader key={leader._id}>
          <LeaderName>{leader.name}</LeaderName>
          <Info><strong>Gym:</strong> {leader.gym}</Info>
          <Info><strong>Badge:</strong> {leader.badge}</Info>
          <Description><strong>Description:</strong> {leader.description}</Description>
          <DeleteButton onClick={() => handleDelete(leader.name)}>Delete</DeleteButton>
        </GymLeader>
      ))}
    </Container>
  );
};

export default GymLeadersList;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const GymLeader = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const LeaderName = styled.h2`
  font-size: 1.2rem;
  color: #333;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const Description = styled.p`
  margin: 10px 0;
  font-size: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
