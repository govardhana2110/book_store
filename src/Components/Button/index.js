import React from "react";
import "./button.css";

const ButtonComponent = ({ name, type, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {name}
    </button>
  );
};
export default ButtonComponent;
