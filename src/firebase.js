import { initializeApp } from "firebase/app"; // start firebase with my chosen settings
import { getAuth } from "firebase/auth"; // enable firebase google authentication
import { getFirestore } from "firebase/firestore"; // enable fire store database for storage

// my Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJeHpzlQ1b3F-0T0SnvhgH9V1ozkdLlHE",
    authDomain: "gametrackr-afa6f.firebaseapp.com",
    projectId: "gametrackr-afa6f",
    storageBucket: "gametrackr-afa6f.firebasestorage.app",
    messagingSenderId: "143115964089",
    appId: "1:143115964089:web:31f40d81d39f84dda25568"
  };

  const app = initializeApp(firebaseConfig);// initialise with my config
export const auth = getAuth(app);  // firebase google authentication
export const db = getFirestore(app); // firestore database
export default app;