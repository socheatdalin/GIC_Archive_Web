import React from "react";
import Logo from "../assets/itc_logo.png";
import Profile from "../assets/student.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import SearchBar from "./SearchBar";

function Navbar() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Implement your search logic here (e.g., fetch data, filter results)
  };

  return (
    <div className="Navbar">
      <div className="leftSide">
        <img src={Logo} alt="itc" />
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="navigation">
          <Link to="/">Home </Link>
          <Link to="/project"> Team project </Link>
          <Link to="/thesis">Thesis </Link>
          <Link to="/more">more </Link>
        </div>
      </div>
      <div className="rightSide">
        <div className="profile-section">
          <div className="profile-avatar">
            <img src={Profile} alt="student" />
          </div>
          <div className="profile-name"></div>
          {/* Add dropdown menu for profile actions */}
          <div className="profile-dropdown">
            <ul>
              <li>
                <Link to="/login">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
