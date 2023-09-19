
import React, { useState } from 'react';
import "../styles/Searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-container" onClick={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      {/* <button onClick={handleSearch} className="search-button">
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
