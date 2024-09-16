import React from "react";

const DropdownComponent = ({options}) => {
  return (
    <select>
      {options && options.map((item) => (
        <option>{item.name}</option>
      ))}
    </select>
  );
};
export default DropdownComponent;
