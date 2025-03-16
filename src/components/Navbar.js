import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import LoginButton from "./LoginButton.js"; // ✅ Import the Login Button

const NavBar = () => { // hold the search query and navigate different routes
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`); // go to the search results page
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* make the GameTrackr text the home button */}
        <Link to="/" className="home-link">
          <h1>GameTrackr</h1>
        </Link>
      </div>
      {/* search bar in the middle of the navbar */}
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
        <LoginButton /> {/* put the login Button on the right */}
        {/* put the Backlog Button underneath */}
        <Link to="/backlog" className="backlog-link">
          <button className="backlog-button">Backlog</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
