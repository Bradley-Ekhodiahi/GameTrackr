import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(null); // `null` ensures no premature rendering
  const [loading, setLoading] = useState(true);

  const getGames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/games");
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialGames = async () => {
      if (!games) {  // Only fetch games if they haven’t been fetched yet
        const gamesData = await getGames();
        setGames(gamesData);
        setLoading(false); // Mark loading as complete **only after** setting games
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
