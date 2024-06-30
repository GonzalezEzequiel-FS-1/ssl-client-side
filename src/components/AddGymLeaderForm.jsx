import React, { useState } from 'react';
import styled from 'styled-components';
import { addGymLeader } from '../services/calls';

const AddGymLeaderForm = () => {
    const initialFormData = {
        name: '',
        gym: '',
        badge: '',
        pokemon: [
            { name: '', level: '' },
            { name: '', level: '' },
            { name: '', level: '' },
            { name: '', level: '' },
            { name: '', level: '' }
        ],
        reward: { tm: '', money: '' },
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'pokemonName' || name === 'pokemonLevel') {
            const updatedPokemon = [...formData.pokemon];
            updatedPokemon[index][name === 'pokemonName' ? 'name' : 'level'] = value;
            setFormData({ ...formData, pokemon: updatedPokemon });
        } else if (name === 'tm' || name === 'money') {
            setFormData({
                ...formData,
                reward: { ...formData.reward, [name]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newLeader = await addGymLeader(formData);
            console.log('New Gym Leader added:', newLeader);
            // Optionally, reset form state or show success message
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error adding Gym Leader:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <FormContainer>
            <h2>Add New Gym Leader</h2>
            <Form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label>Gym:</label>
                <input
                    type="text"
                    name="gym"
                    value={formData.gym}
                    onChange={handleChange}
                    required
                />
                <label>Badge:</label>
                <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    required
                />
                <label>Team of Pokémon:</label>
                {formData.pokemon.map((poke, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="pokemonName"
                            placeholder="Pokemon Name"
                            value={poke.name}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        <input
                            type="number"
                            name="pokemonLevel"
                            placeholder="Level"
                            value={poke.level}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                ))}
                <label>Reward:</label>
                <input
                    type="text"
                    name="tm"
                    placeholder="TM"
                    value={formData.reward.tm}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="money"
                    placeholder="Money"
                    value={formData.reward.money}
                    onChange={handleChange}
                    required
                />
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Gym Leader</button>
            </Form>
        </FormContainer>
    );
};

export default AddGymLeaderForm;

const FormContainer = styled.div`
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    label {
        margin-top: 10px;
        font-weight: bold;
    }

    input, textarea {
        margin-top: 5px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }
`;
