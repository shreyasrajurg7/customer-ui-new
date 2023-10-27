import React from "react";
import "./TextBox.css";
const TextBox = ({onChange, value, iconUrl, style, type}) => {
  return (
    <div className="search-container" style={style}>
      {iconUrl && <img className="search-icon" src={iconUrl} />}
      <input
        type={type}
        className="search-input"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextBox;
