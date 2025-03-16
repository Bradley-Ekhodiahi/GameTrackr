import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext(); // keeps the context of any game related data

export const GameProvider = ({ children }) => { // wrap the whole app with this so the games state is always constant
  const [games, setGames] = useState(null); // `null` ensures no premature rendering
  const [loading, setLoading] = useState(true); // show " loading" until the games are loaded

  const getGames = async () => { // fetch games using axios to request
    try {
      const response = await axios.get("http://localhost:5000/api/games");
      return response.data; // return the game or return an empty array
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
        setLoading(false); // only stop loading when the games have been set 
      }
    };
    fetchInitialGames();
  }, []); // run only once to avoid constant randomisation

  return ( // provide to the rest of the app
    <GameContext.Provider value={{ games, setGames, getGames, loading }}>
      {children}
    </GameContext.Provider>
  );
};
