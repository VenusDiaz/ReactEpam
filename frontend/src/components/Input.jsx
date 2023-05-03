import React from "react";

export const Input = ({ placeholder = "Search Term", name = "searchbar" }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}></label>
      <input
        className="search-input"
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
};
