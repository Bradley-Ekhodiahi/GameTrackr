import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../utils/api.js"; // get a game's details with it's id
import { db, auth } from "../firebase.js"; // import Firestore database & firebase authentication
import { doc, setDoc, getDoc } from "firebase/firestore";

const GamePage = () => {
  const { id } = useParams(); // take the game id
  const [game, setGame] = useState(null); // keep the data 
  const [backlogStatus, setBacklogStatus] = useState(null); // track and set the category chosen
  const user = auth.currentUser; // Get logged-in user

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGameDetails(id);
        setGame(gameData);

        if (user) {
          // fetches the backlog status from Firestore if you're logged in
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
  // show this message when games are loading
  if (!game) return <p>Loading game details...</p>;
  // get the games release date
  const releaseDate = game.release_dates?.length
    ? new Date(
        Math.min(...game.release_dates.map((d) => d.date * 1000))
      ).toLocaleDateString()
    : "N/A";

  //  updates the backlog status in Firestore database only when logged in otherwise error
  const updateBacklog = async (status) => {
    if (!user) {
      alert("You need to log in to save to your backlog.");
      return;
    }
  
    try {
      const gameRef = doc(db, "users", user.uid, "backlog", id);
      // stores the game's name, status, and cover
      await setDoc(
        gameRef,
        {
          status,
          gameName: game.name,
          cover: game.cover, 
        },
        { merge: true }
      );
      setBacklogStatus(status); // update the backlog in the front end
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

      {/* Backlog Category Buttons */}
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
