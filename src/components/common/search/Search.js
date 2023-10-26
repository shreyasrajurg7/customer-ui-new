import React from "react";
import "./Search.css";
const Search = ({onChange}) => {
  return (
    <div className="search-container">
      {/* <i className="search-icon fas fa-search"></i> */}
      <img className="search-icon" src="/icons/search.svg" />
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
