import React, { useState } from 'react';
import styled from 'styled-components';
import { updateGymLeader } from '../services/calls';

const UpdateGymLeaderForm = ({ leader, onUpdate }) => {
    const [name, setName] = useState(leader.name);
    const [gym, setGym] = useState(leader.gym);
    const [badge, setBadge] = useState(leader.badge);
    const [description, setDescription] = useState(leader.description);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedGymLeader = { ...leader, name, gym, badge, description };

        try {
            await updateGymLeader(updatedGymLeader);
            onUpdate();
        } catch (error) {
            console.error("Error updating gym leader:", error);
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
            <button type="submit">Update Gym Leader</button>
        </FormContainer>
    );
};

export default UpdateGymLeaderForm;

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
