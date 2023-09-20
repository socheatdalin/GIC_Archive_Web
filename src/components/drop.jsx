import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/dropdown.css";
function dropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="#23395D"
        id="dropdown-basic"
        style={{ backgroundColor: "007BB2" }}
      >
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: "white" }}>
        <Dropdown.Item>Promotion 22nd</Dropdown.Item>
        <Dropdown.Item>Promotion 23rd</Dropdown.Item>
        <Dropdown.Item>Promotion 24th</Dropdown.Item>
        <Dropdown.Item>Promotion 25th</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default dropdown;
