import axios from "axios";

const GMLD_URL = "http://127.0.0.1:6969/api/pokedex/gymleaders";
const PKMN_URL = "http://127.0.0.1:6969/api/pokedex/genone";

export const getAll = async () => {
    try {
        const response = await axios.get(GMLD_URL);
        return response.data.gymLeaders; // Return the entire response data
    } catch (error) {
        console.error("Error fetching gym leaders:", error);
        throw error;
    }
};

export const deleteByName = async (name) => {
    try {
        const response = await axios.delete(`${GMLD_URL}/delete?name=${name}`);
        return response.data.gymLeaders; // Return the entire response data
    } catch (error) {
        console.error("Error deleting gym leader:", error);
        throw error;
    }
};

export const createGymLeader = async (gymLeader) => {
    try {
        const response = await axios.post(`${GMLD_URL}/create`, gymLeader);
        return response.data.data; // Return the new gym leader data
    } catch (error) {
        console.error("Error creating gym leader:", error);
        throw error;
    }
};

export const updateGymLeader = async (gymLeader) => {
    try {
        const response = await axios.put(`${GMLD_URL}/edit/${gymLeader._id}`, gymLeader);
        return response.data.data; // Return the updated gym leader data
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
        return response.data; // Return the response data (new Gym Leader)
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
        }
        throw error; // Rethrow the error to propagate it further
    }
};
