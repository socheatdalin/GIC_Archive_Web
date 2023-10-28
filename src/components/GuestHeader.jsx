import React from "react";
import Logo from "../assets/itc_logo.png";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/navigation.css";
import "../styles/Navbar.css";
import Search from "./Header/Search";

function GuestHeader() {
  return (
    <div className="Navbar">
      <div className="leftSide">
        <img src={Logo} alt="itc" />
        <h6>Institute of Technology of Cambodia</h6>
      </div>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" activeClassName=" active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projectguest" activeClassName="active">
              Team Project
            </Nav.Link>
            <Nav.Link as={NavLink} to="/thesisguest" activeClassName="active">
              Thesis
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="rightSide">
        <Search />
        <div className="profile-section">
          <div className="Login">
            <Link
              to="/login"
              style={{
                color: "#007BB2",
              border: "1px solid white",
              backgroundColor: "white",
              borderRadius: "5px",
              height: "30px", 
              width: "70px",
              fontSize: "20px", 
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center", 
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestHeader;
