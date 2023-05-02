import React from "react";

export const Button = ({ buttonText, onClick }) => {
  return (
    <button
      label={buttonText}
      onClick={() => {
        onClick();
      }}
    >
      {buttonText}
    </button>
  );
};
