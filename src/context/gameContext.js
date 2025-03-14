import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext();

const API_URL = import.meta.env.VITE_API_URL; // Use environment variable

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/games`);
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialGames = async () => {
      if (!games) {
        const gamesData = await getGames();
        setGames(gamesData);
        setLoading(false);
      }
    };
    fetchInitialGames();
  }, []); // Runs only once on mount

  return (
    <GameContext.Provider value={{ games, setGames, getGames, loading }}>
      {children}
    </GameContext.Provider>
  );
};
