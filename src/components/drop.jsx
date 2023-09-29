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
        <Dropdown.Item>Operating System</Dropdown.Item>
        <Dropdown.Item>Network</Dropdown.Item>
        <Dropdown.Item>Software Engineering</Dropdown.Item>
        <Dropdown.Item>Internet Programming</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default dropdown;
