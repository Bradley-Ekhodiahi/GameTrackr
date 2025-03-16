import { db } from "../firebase"; // imports the database
import { doc, setDoc, getDoc } from "firebase/firestore"; // reference a firestore document, add and retrieve data from database.

// take the userID, gameId and the category it's being placed in and store the info in the database.
export const addGameToBacklog = async (userId, gameId, status) => { 
  try {
    const gameRef = doc(db, "users", userId, "backlog", gameId);
    await setDoc(gameRef, { status }, { merge: true });
  } catch (error) {
    console.error("Error adding game:", error);
  }
};

// used to show user their backlog if it exists otherwise it's an error and they are not shown a backlog
export const getUserBacklog = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data().backlog || {} : {};
  } catch (error) {
    console.error("Error getting backlog:", error);
    return {};
  }
};
