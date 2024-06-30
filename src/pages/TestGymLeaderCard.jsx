import React, { useState } from 'react';
import GymLeaderCard from '../components/GymLeaderCard';
import { getPokemonById } from '../services/calls';

const dummyLeader = {
    _id: "1",
    name: "Brock",
    gym: "Pewter City",
    badge: "Boulder Badge",
    pokemon: [{ _id: "667350e1faf5b4aeccc2208c", name: "Onix" }],
    description: "Brock is a rock-type gym leader."
};

const TestGymLeaderCard = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonSelect = async (id) => {
        try {
            const pokemonData = await getPokemonById(id);
            setSelectedPokemon(pokemonData);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    };

    const handleDelete = (name) => {
        console.log(`Deleted ${name}`);
    };

    return (
        <GymLeaderCard
            leader={dummyLeader}
            selectedPokemon={selectedPokemon}
            onSelectPokemon={handlePokemonSelect}
            onDelete={handleDelete}
        />
    );
};

export default TestGymLeaderCard;
