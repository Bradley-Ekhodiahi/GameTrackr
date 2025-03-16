import { useContext } from "react";
import { GameContext } from "../context/gameContext.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { games, loading } = useContext(GameContext); // check if the games are still loading if they are then don't render

  if (loading || games === null) return null; // used so there's no flickering game display on the home page
  // display the list of 10 game names and covers on the home page with a horizontal scroll bar
  return (
    <div>
      <h2>Game List</h2>
      <div style={{ display: "flex", overflowX: "auto", gap: "10px", padding: "10px" }}>
        {games.map((game) => (
          <div key={game.id} style={{ minWidth: "200px", textAlign: "center" }}>
            <Link to={`/game/${game.id}`}>
              <h3>{game.name}</h3>
              {game.cover && (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                  style={{ width: "150px", height: "200px", borderRadius: "10px" }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
