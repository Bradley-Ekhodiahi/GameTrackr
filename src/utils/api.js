import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch game list
export const getGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

// Fetch game details
export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};
