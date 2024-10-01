import React from "react";
import "./textArea.css";

const TextAreaComponent = ({
  label,
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
      <textarea
        onChange={onChange}
        value={value}
        placeholder={`Enter ${placeholder}`}
        required={required}
      ></textarea>
    </div>
  );
};
export default TextAreaComponent;
