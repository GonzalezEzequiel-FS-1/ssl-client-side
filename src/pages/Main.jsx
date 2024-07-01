import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getAll, deleteByName } from '../services/calls';
import GymLeaderCard from '../components/GymLeaderCard';
import AddGymLeaderForm from '../components/AddGymLeaderForm';
import UpdateGymLeaderForm from '../components/UpdateGymLeaderForm';

const Main = () => {
    const [gymLeaders, setGymLeaders] = useState([]);
    const [selectedLeader, setSelectedLeader] = useState(null);

    const fetchGymLeaders = useCallback(async () => {
        try {
            const data = await getAll();
            setGymLeaders(data);
        } catch (error) {
            console.error("Error fetching gym leaders:", error);
        }
    }, []);

    useEffect(() => {
        fetchGymLeaders();
    }, [fetchGymLeaders]);

    const handleDelete = async (name) => {
        try {
            await deleteByName(name);
            fetchGymLeaders();
        } catch (error) {
            console.error("Error deleting gym leader:", error);
        }
    };

    const handleUpdate = async () => {
        fetchGymLeaders();
        setSelectedLeader(null);
    };

    return (
        <Container>
            <h1>Gym Leaders</h1>
            <AddGymLeaderForm onAdd={fetchGymLeaders} />
            {selectedLeader && (
                <UpdateGymLeaderForm leader={selectedLeader} onUpdate={handleUpdate} />
            )}
            <LeadersContainer>
                {gymLeaders.map((leader) => (
                    <GymLeaderCard
                        key={leader._id}
                        leader={leader}
                        onDelete={handleDelete}
                        onEdit={() => setSelectedLeader(leader)}
                    />
                ))}
            </LeadersContainer>
        </Container>
    );
};

export default Main;

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LeadersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;
