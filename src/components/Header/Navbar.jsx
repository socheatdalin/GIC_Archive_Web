import React from "react";
// import { useState } from "react";
import Logo from "../../assets/itc_logo.png";
import { Link } from "react-router-dom";
import Navigation from "./navigation";
import "../../styles/Navbar.css";
import Search from "./Search";
import Popup from "./Popup";
function Navbar() {

  return (
    <div className="Navbar">
      <div className="leftSide">
        <img src={Logo} alt="itc" />
        <h6>Institute of technology of Cambodia</h6>
      </div>
      <Navigation />

      <div className="rightSide">
        <Search />
        <div className="profile-section">
          <div className="profile-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="white"
                stroke-dasharray="28"
                stroke-dashoffset="28"
                stroke-linecap="round"
                stroke-width="2"
              >
                <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
              </g>
            </svg>
          </div>
          <div></div>
          <div className="profile-name">
          </div>
          <div className="profile-dropdown">
            <ul>
              <li>
                {/* <Link to="/userpf">Profile</Link> */}
                Profile
                <Popup />
              </li>
              <li>
                <Link to="http://localhost:3003/home">Dashboard</Link>
              </li>
              <li>
                <Link to="http://localhost:3000">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
