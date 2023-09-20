import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/dropdown.css'
function dropdown() {
    
  return (
    <Dropdown>
      <Dropdown.Toggle variant="#23395D" id="dropdown-basic" style={{backgroundColor: "007BB2"}}>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ backgroundColor: "white" }}>
        <Dropdown.Item >Web App</Dropdown.Item>
        <Dropdown.Item>Mobile App</Dropdown.Item>
        <Dropdown.Item>Network</Dropdown.Item>
        <Dropdown.Item>Data Science</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default dropdown;
