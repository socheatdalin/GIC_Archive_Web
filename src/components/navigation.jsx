import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation.css"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active" // Specify the active class name here
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active" // Specify the active class name here
            to="/project"
          >
            Team Project
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active" // Specify the active class name here
            to="/thesis"
          >
            Thesis
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
