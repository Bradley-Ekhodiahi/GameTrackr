import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js"; // Firebase connection and auth import
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const BacklogPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchBacklog = async () => {
      const user = auth.currentUser; // Get the logged-in user

      if (user) {
        try {
          // Query the user's backlog collection
          const backlogRef = collection(db, "users", user.uid, "backlog");
          const querySnapshot = await getDocs(backlogRef);
          const gamesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGames(gamesList);
        } catch (error) {
          console.error("Error fetching games: ", error);
        }
      }
    };

    fetchBacklog();
  }, []); // Fetch when component mounts

  // Function to remove a game from the backlog
  const removeFromBacklog = async (gameId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const gameRef = doc(db, "users", user.uid, "backlog", gameId);
        await deleteDoc(gameRef); // Remove the document from Firestore
        setGames((prevGames) => prevGames.filter((game) => game.id !== gameId)); // Update UI after removal
      } catch (error) {
        console.error("Error removing game: ", error);
      }
    }
  };

  return (
    <div>
      <h1>My Backlog</h1>
      <div>
        {games.length === 0 ? (
          <p>No games in your backlog yet.</p>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                <div>
                  {/* Show game image if available */}
                  {game.cover?.image_id ? (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                        alt={game.gameName}
                        style={{ width: "100px", height: "150px", marginRight: "10px" }}
                    />
                    ) : (
                    <p>No image available</p>
                    )}
                  {/* Game name and status */}
                  <span>{game.gameName} - Status: {game.status}</span>
                </div>
                {/* Remove button */}
                <button onClick={() => removeFromBacklog(game.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BacklogPage;
