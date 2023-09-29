import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "../../styles/navigation.css"
function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand>
  
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/home" activeClassName="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/project" activeClassName="active">
            Team Project
          </Nav.Link>
          <Nav.Link as={NavLink} to="/thesis" activeClassName="active">
            Thesis
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
