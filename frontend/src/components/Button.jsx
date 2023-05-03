import React from "react";

export const Button = ({
  buttonText,
  onClick,
  className = "button-container",
}) => {
  return (
    <div className={className}>
      <button
        label={buttonText}
        onClick={() => {
          onClick();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};
