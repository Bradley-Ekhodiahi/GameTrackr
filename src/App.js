import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // allows client side routing
import Home from "./pages/Home.js"; // all of these just import components and pages 
import Navbar from "./components/Navbar.js"; // shows up on every page
import SearchResults from "./pages/SearchResults.js";
import GamePage from "./pages/GamePage.js";
import BacklogPage from "./pages/BacklogPage.js";
import { GameProvider } from "./context/gameContext.js"; // used to know if state of game data
import { AuthProvider } from "./context/authContext.js"; // used to know if somebody is logged in or not
function App() {
  return (
    <AuthProvider> {/* wrap the entire app for the authentication state */}
    <GameProvider> {/* do the same for any game-related states */}
      <Router>
        <Navbar /> {/* navbar on every page */}
        <main>
          <Routes> {/* all of these just map components to their correct urls */}
            <Route path="/" element={<Home />} /> 
            <Route path="/search" element={<SearchResults />} /> 
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/backlog" element={<BacklogPage />} />
          </Routes>
        </main>
      </Router>
    </GameProvider>
    </AuthProvider>
  );
}

export default App;
