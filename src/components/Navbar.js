import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import LoginButton from "./LoginButton.js"; // ✅ Import the Login Button

const NavBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Make GameTrackr text clickable and go to Home */}
        <Link to="/" className="home-link">
          <h1>GameTrackr</h1>
        </Link>
      </div>

      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="nav-right">
        <LoginButton /> {/* ✅ Login Button on the right */}
        {/* Add Backlog Button here */}
        <Link to="/backlog" className="backlog-link">
          <button className="backlog-button">Backlog</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
