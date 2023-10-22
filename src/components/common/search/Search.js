import React from "react";
import "./Search.css";
const Search = () => {
  return (
    <div className="search-container">
      {/* <i className="search-icon fas fa-search"></i> */}
      <img className="search-icon" src="/icons/search.svg" />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
