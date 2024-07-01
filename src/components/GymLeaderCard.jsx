import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPokemonById } from '../services/calls';
import PokemonDetails from './pokemonDetails';

const GymLeaderCard = ({ leader, onDelete, onEdit }) => {
    const [pokemonDetails, setPokemonDetails] = useState([]);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const details = await Promise.all(
                    leader.pokemon.map(poke => getPokemonById(poke.name))
                );
                setPokemonDetails(details);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            }
        };

        fetchPokemonDetails();
    }, [leader.pokemon]);
    
    return (
        <LeaderCard>
            <LeaderName>{leader.name}</LeaderName>
            <Info>Gym: {leader.gym}</Info>
            <Info>Badge: {leader.badge}</Info>
            <Info>Description: {leader.description}</Info>
            <Info>Team:</Info>
            <PokemonList>
                {pokemonDetails.map((pokemon, index) => (
                    <PokemonDetailsContainer key={index}>
                        <PokemonDetails pokemon={pokemon} />
                    </PokemonDetailsContainer>
                ))}
            </PokemonList>
            <ButtonContainer>
                <DeleteButton onClick={() => onDelete(leader.name)}>Delete</DeleteButton>
                <EditButton onClick={onEdit}>Edit</EditButton>
            </ButtonContainer>
        </LeaderCard>
    );
};

export default GymLeaderCard;

const LeaderCard = styled.section`
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    width: calc(33.33% - 20px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LeaderName = styled.h2`
    font-size: 1.2rem;
    color: #333;
`;

const Info = styled.p`
    margin: 5px 0;
    font-size: 1rem;
`;

const PokemonList = styled.ul`
    list-style-type: none;
    padding: 0;
    width:20rem;
`;

const PokemonDetailsContainer = styled.li`
    margin-bottom: 10px;
    display:flex;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const DeleteButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
`;

const EditButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
`;
