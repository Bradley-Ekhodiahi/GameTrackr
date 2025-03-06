import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js"; // ✅ Import Navbar
import SearchResults from "./pages/SearchResults.js";
import GamePage from "./pages/GamePage.js";
import { getGames } from "./utils/api.js";
import { GameProvider } from "./context/gameContext.js"; // ✅ Import the provider
import { useGameContext } from "./context/gameContext.js"; // ✅ Import custom hook for context

function App() {
  return (
    <GameProvider>
      <Router>
        <Header />
        <Navbar /> {/* ✅ Added Navbar so users can search */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* ✅ No need to pass games */}
            <Route path="/search" element={<SearchResults />} /> {/* Change from "/search-results" */}
            <Route path="/game/:id" element={<GamePage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </GameProvider>
  );
}

export default App;
