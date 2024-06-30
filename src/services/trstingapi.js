const axios = require("axios")
const PKMN_URL = "http://127.0.0.1:6969/api/pokedex/genone"
const id= "667350e1faf5b4aeccc2208c"
const getPokemonById = async (name) => {
    try {
        const response = await axios.get(`${PKMN_URL}/select?_id=${id}`);
        const pokemonData = response.data.data[0];
        console.log(pokemonData.img)
        return {
            _id: pokemonData._id,
            name: pokemonData.name,
            img: pokemonData.img
        };
    } catch (error) {
        console.error("Error Fetching Pokémons:", error);
        throw error;
    }
};
getPokemonById();