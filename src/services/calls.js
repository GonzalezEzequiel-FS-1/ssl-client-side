import axios from "axios";

const GMLD_URL = "http://127.0.0.1:6969/api/pokedex/gymleaders";
const PKMN_URL = "http://127.0.0.1:6969/api/pokedex/genone";

export const getAll = async () => {
    try {
        const response = await axios.get(GMLD_URL);
        return response.data.gymLeaders;
    } catch (error) {
        console.error("Error fetching gym leaders:", error);
        throw error;
    }
};

export const deleteByName = async (name) => {
    try {
        const response = await axios.delete(`${GMLD_URL}/delete?name=${name}`);
        return response.data.gymLeaders;
    } catch (error) {
        console.error("Error deleting gym leader:", error);
        throw error;
    }
};

export const createGymLeader = async (gymLeader) => {
    try {
        const response = await axios.post(`${GMLD_URL}/create`, gymLeader);
        return response.data.data;
    } catch (error) {
        console.error("Error creating gym leader:", error);
        throw error;
    }
};

export const updateGymLeader = async (gymLeader) => {
    try {
        const response = await axios.put(`${GMLD_URL}/edit/${gymLeader._id}`, gymLeader);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error("Error updating gym leader:", error);
        throw error;
    }
};

export const getPokemonById = async (id) => {
    try {
        const response = await axios.get(`${PKMN_URL}/select?_id=${id}`);
        const pokemonData = response.data.data[0];

        if (!pokemonData) {
            throw new Error(`No data found for Pokémon with ID: ${id}`);
        }

        return {
            _id: pokemonData._id,
            name: pokemonData.name,
            img: pokemonData.img,
            type: pokemonData.type,
            height: pokemonData.height,
            weight: pokemonData.weight,
            weaknesses: pokemonData.weaknesses,
        };
    } catch (error) {
        console.error("Error Fetching Pokémon:", error);
        throw error;
    }
};

export const addGymLeader = async (gymLeaderData) => {
    try {
        const response = await axios.post(`${GMLD_URL}/create`, gymLeaderData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up the request:", error.message);
        }
        throw error;
    }
};

export const searchByName = async (name) => {
    try {
        const response = await axios.get(`${GMLD_URL}/search/name/${name}`);
        console.log(response.data.gymLeader[0])
        if (response.data.success && response.data.gymLeaders) {
            return response.data.gymLeaders[0];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error searching gym leader:", error);
        throw error;
    }
};
