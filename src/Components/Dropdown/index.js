import React from "react";
import "./dropdown.css";

const DropdownComponent = ({
  options,
  placeHolder,
  value,
  onChange,
  label,
}) => {
  const selectElement = document.getElementById("customSelect");
  if (selectElement) {
    selectElement.addEventListener("mousedown", function () {
      this.classList.add("open");
    });

    selectElement.addEventListener("blur", function () {
      this.classList.remove("open");
    });
  }
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
      </label>
      <select id="customSelect" value={value} onChange={onChange}>
        {placeHolder && (
          <option value="" disabled>
            {placeHolder}
          </option>
        )}
        {options &&
          options.map((item) => (
            <>
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            </>
          ))}
      </select>
    </div>
  );
};
export default DropdownComponent;
