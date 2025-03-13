import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js"; // ✅ Import Navbar
import SearchResults from "./pages/SearchResults.js";
import GamePage from "./pages/GamePage.js";
import BacklogPage from "./pages/BacklogPage.js";
import { GameProvider } from "./context/gameContext.js"; // ✅ Import the provider
import { AuthProvider } from "./context/authContext.js"; // Import AuthProvider
function App() {
  return (
    <AuthProvider>
    <GameProvider>
      <Router>
        <Navbar /> {/* ✅ Added Navbar so users can search */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* ✅ No need to pass games */}
            <Route path="/search" element={<SearchResults />} /> {/* Change from "/search-results" */}
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
