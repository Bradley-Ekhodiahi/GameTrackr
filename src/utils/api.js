import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Use environment variable

// Fetch game list
export const getGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/games`);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

// Fetch game details
export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/api/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};
