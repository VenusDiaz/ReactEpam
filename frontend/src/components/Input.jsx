import React from "react";

export const Input = ({
  placeholder = "Search Term",
  name = "searchbar",
  className = "input-container",
  onChange,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}></label>
      <input
        onChange={onChange}
        className="search-input"
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  );
};
