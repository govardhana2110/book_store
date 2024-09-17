import React from "react";
import "./header.css";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  return <div className="headDiv">Header{storeData?.cartItems.length}</div>;
};
export default HeaderComponent;
