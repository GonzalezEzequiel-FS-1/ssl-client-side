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
    const response = await axios.post(GMLD_URL, gymLeader);
    return response.data.gymLeader;
  } catch (error) {
    console.error("Error creating gym leader:", error);
    throw error;
  }
};

export const updateGymLeader = async (gymLeader) => {
  try {
    const response = await axios.put(`${GMLD_URL}/${gymLeader._id}`, gymLeader);
    return response.data.gymLeader;
  } catch (error) {
    console.error("Error updating gym leader:", error);
    throw error;
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`${PKMN_URL}/select?_id=${id}`);
    console.log('API Response:', response.data);
    const pokemonData = response.data.data[0];

    if (!pokemonData) {
      throw new Error(`No data found for Pokémon with ID: ${id}`);
    }

    console.log('Fetched Pokémon Data:', pokemonData);
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
    console.error("Error Fetching Pokémons:", error);
    throw error;
  }
};
