import React from "react";
import "./dropdown.css";

const DropdownComponent = ({ options, placeHolder,value,onChange }) => {
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
  );
};
export default DropdownComponent;
