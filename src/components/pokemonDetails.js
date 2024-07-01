import React from 'react';
import styled from 'styled-components';

const PokemonDetails = ({ pokemon }) => {
    if (!pokemon) {
        return null;
    }

    return (
        <Container>
            <h2>{pokemon.name}</h2>
            <PokemonImage src={pokemon.img} alt={pokemon.name} />
            <Info>Type: {pokemon.type.join(', ')}</Info>
            <Info>Height: {pokemon.height}</Info>
            <Info>Weight: {pokemon.weight}</Info>
            <Info>Weaknesses: {pokemon.weaknesses.join(', ')}</Info>
        </Container>
    );
};

export default PokemonDetails;

const Container = styled.div`
    width: 100%;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PokemonImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
`;

const Info = styled.p`
    margin: 5px 0;
    font-size: 1rem;
`;
