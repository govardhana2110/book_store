import React from "react";
import './dropdown.css';

const DropdownComponent = ({options}) => {
  return (
    <select>
      {options && options.map((item) => (
        <option key={item.name}>{item.name}</option>
      ))}
    </select>
  );
};
export default DropdownComponent;
