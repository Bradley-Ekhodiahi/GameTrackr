import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../utils/api.js";
import { db, auth } from "../firebase.js"; // Import Firestore & Auth
import { doc, setDoc, getDoc } from "firebase/firestore";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [backlogStatus, setBacklogStatus] = useState(null); // Track user's selection
  const user = auth.currentUser; // Get logged-in user

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGameDetails(id);
        setGame(gameData);

        if (user) {
          // Fetch the backlog status from Firestore
          const gameRef = doc(db, "users", user.uid, "backlog", id);
          const docSnap = await getDoc(gameRef);
          if (docSnap.exists()) {
            setBacklogStatus(docSnap.data().status);
          }
        }
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id, user]);

  if (!game) return <p>Loading game details...</p>;

  const releaseDate = game.release_dates?.length
    ? new Date(
        Math.min(...game.release_dates.map((d) => d.date * 1000))
      ).toLocaleDateString()
    : "N/A";

  // Function to update the backlog status in Firestore
  const updateBacklog = async (status) => {
    if (!user) {
      alert("You need to log in to save to your backlog.");
      return;
    }
  
    try {
      const gameRef = doc(db, "users", user.uid, "backlog", id);
      // Store the game name, status, and image_id (or the full image URL if available)
      await setDoc(
        gameRef,
        {
          status,
          gameName: game.name,
          cover: game.cover, // Save the cover image data
        },
        { merge: true }
      );
      setBacklogStatus(status); // Update UI
    } catch (error) {
      console.error("Error updating backlog:", error);
    }
  };

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

      {/* Backlog Buttons */}
      <div>
        <p>Backlog Status: {backlogStatus || "Not added"}</p>
        <button onClick={() => updateBacklog("Playing")}>Playing</button>
        <button onClick={() => updateBacklog("Completed")}>Completed</button>
        <button onClick={() => updateBacklog("Wishlist")}>Wishlist</button>
        <button onClick={() => updateBacklog("Dropped")}>Dropped</button>
      </div>
    </div>
  );
};

export default GamePage;
