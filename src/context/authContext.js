import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const authContext = createContext(); // for the state of authentication whether logged in or not

export const AuthProvider = ({ children }) => { // provides the entire app with the authentication state constantly
  const [user, setUser] = useState(null); 

  useEffect(() => { // once the component is unmounted stop checking for authentication status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  // function to log a user in with google with a pop up, if it doesn't work gives an error
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  // logout using signout function from firebase
  const logout = async () => {
    await signOut(auth);
  };
  // wrap the whole app with authentication on every page
  return (
    <authContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
