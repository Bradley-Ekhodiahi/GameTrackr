import axios from 'axios'; // use axios to send requests to the backend

const API_URL = 'http://localhost:5000/api'; // api's url is localhost port 5000

// fetch the list of games from the API using the url
export const getGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

// fetch the details of a game for when it's clicked, gameId is dynamic
export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};
