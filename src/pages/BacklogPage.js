import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js"; // import database and authentication 
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // the collection of backlogs, being able to delete, fetch and add to them

const BacklogPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchBacklog = async () => {
      const user = auth.currentUser; // get the user from their userId

      if (user) {
        try {
          // look for the games in the user's backlog via id
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
  }, []); // fetch the backlog

  // function used if you want to remove a game from your backlog
  const removeFromBacklog = async (gameId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const gameRef = doc(db, "users", user.uid, "backlog", gameId);
        await deleteDoc(gameRef); // remove the game from Firestore
        setGames((prevGames) => prevGames.filter((game) => game.id !== gameId)); // update the UI without the game
      } catch (error) {
        console.error("Error removing game: ", error);
      }
    }
  };

  return (
    <div>
      <h1>My Backlog</h1>
      <div>{/* if your backlog is empty */}
        {games.length === 0 ? (
          <p>No games in your backlog yet.</p>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                <div>
                  {/* Show game cover */}
                  {game.cover?.image_id ? (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                        alt={game.gameName}
                        style={{ width: "100px", height: "150px", marginRight: "10px" }}
                    />
                    ) : (
                    <p>No image available</p>
                    )}
                  {/* Game name and category */}
                  <span>{game.gameName} - Status: {game.status}</span>
                </div>
                {/* Remove game button */}
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
