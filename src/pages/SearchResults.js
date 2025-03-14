import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

// Get the API URL dynamically from the environment variable
const API_URL = process.env.REACT_APP_API_URL;

const SearchResults = () => {
  const [searchParams] = useSearchParams(); // Get query params from URL
  const query = searchParams.get("q"); // Extract "q" from "?q=halo"
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return; // Don't fetch if there's no query
      try {
        const response = await fetch(`${API_URL}/search?query=${query}`);  // Use dynamic API URL
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]); // Run this effect when query changes

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {games.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", padding: "10px" }}>
          {games.map((game) => (
            <div key={game.id} style={{ width: "150px", textAlign: "center" }}>
              <Link to={`/game/${game.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3>{game.name}</h3>
                {game.cover && (
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                    alt={game.name}
                    style={{ width: "100px", height: "150px", borderRadius: "10px" }}
                  />
                )}
                {game.rating && <p>⭐ {game.rating.toFixed(1)}</p>}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
