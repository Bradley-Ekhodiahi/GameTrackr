import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const addGameToBacklog = async (userId, gameId, status) => {
  try {
    const gameRef = doc(db, "users", userId, "backlog", gameId);
    await setDoc(gameRef, { status }, { merge: true });
  } catch (error) {
    console.error("Error adding game:", error);
  }
};

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
