import React from "react";
import "./input.css";

const InputComponent = ({
  label,
  type,
  onChange,
  value,
  placeholder,
  required,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          color: "#676767",
          textAlign: "left",
          fontSize: "small",
          fontWeight: "bold",
        }}
      >
        {label}
        {required && <span style={{ color: "orangered" }}>*</span>}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={`Enter ${placeholder}`}
        required={required}
      ></input>
    </div>
  );
};
export default InputComponent;
