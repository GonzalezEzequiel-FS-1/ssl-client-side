import React, { useState } from 'react';
import styled from 'styled-components';
import { createGymLeader } from '../services/calls';

const AddGymLeaderForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [gym, setGym] = useState('');
    const [badge, setBadge] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGymLeader = { name, gym, badge, description, pokemon: [] };

        try {
            await createGymLeader(newGymLeader);
            onAdd();
            setName('');
            setGym('');
            setBadge('');
            setDescription('');
        } catch (error) {
            console.error("Error adding gym leader:", error);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormField>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </FormField>
            <FormField>
                <label>Gym:</label>
                <input
                    type="text"
                    value={gym}
                    onChange={(e) => setGym(e.target.value)}
                    required
                />
            </FormField>
            <FormField>
                <label>Badge:</label>
                <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    required
                />
            </FormField>
            <FormField>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </FormField>
            <button type="submit">Add Gym Leader</button>
        </FormContainer>
    );
};

export default AddGymLeaderForm;

const FormContainer = styled.form`
    margin: 20px 0;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
`;

const FormField = styled.div`
    margin-bottom: 10px;

    label {
        display: block;
        margin-bottom: 5px;
    }

    input, textarea {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
`;
