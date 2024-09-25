import React from "react";
import './input.css';

const InputComponent = ({ type, onChange, value, placeholder, required }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      required={required}
    ></input>
  );
};
export default InputComponent;
