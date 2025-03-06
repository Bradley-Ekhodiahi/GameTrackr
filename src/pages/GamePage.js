import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../utils/api.js";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGameDetails(id);
        setGame(gameData);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!game) return <p>Loading game details...</p>;

  const releaseDate = game.release_dates?.length
  ? new Date(
      Math.min(...game.release_dates.map((d) => d.date * 1000))
    ).toLocaleDateString()
  : "N/A";


  return (
    <div>
      <h2>{game.name}</h2>
      {game.cover?.image_id && (
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
          alt={game.name}
          style={{ width: "200px" }}
        />
      )}
      <p>Rating: {game.rating || "N/A"}</p>
      <p>Release Date: {releaseDate}</p>
    </div>
  );
};

export default GamePage;
