import React from "react";
import { useAuth } from "../context/authContext.js";

const LoginButton = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
};

export default LoginButton;
