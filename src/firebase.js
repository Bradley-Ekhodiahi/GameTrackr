import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJeHpzlQ1b3F-0T0SnvhgH9V1ozkdLlHE",
    authDomain: "gametrackr-afa6f.firebaseapp.com",
    projectId: "gametrackr-afa6f",
    storageBucket: "gametrackr-afa6f.firebasestorage.app",
    messagingSenderId: "143115964089",
    appId: "1:143115964089:web:31f40d81d39f84dda25568"
  };

  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Authentication
export const db = getFirestore(app); // Firestore Database
export default app;