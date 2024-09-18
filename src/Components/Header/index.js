import React, { useEffect, useState } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const [mouseHover, setMouseHover] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const clickListner = (event) => {
      const clickedId = event.target.id;
      if (clickedId !== "profile_icon") {
        setMouseHover(false);
      }
    };
    document.addEventListener("click", clickListner);
    return () => {
      document.removeEventListener("click", clickListner);
    };
  }, []);
  const onProfileClick = () => {
    setMouseHover((prev) => !prev);
  };
  const onClick = (route) => {
    navigate(route);
  };
  return (
    <>
      <div className="headDiv">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "100vw",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          >
            <img
              src="images/daimlerImage.png"
              alt="#"
              style={{ height: "2rem", width: "6rem" }}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "2rem",
            }}
          >
            <label>Cart Items {storeData?.cartItems?.length}</label>
            <img
              className="profileIco"
              src="images/profile.ico"
              alt="#"
              style={{ height: "2rem", width: "2rem" }}
              onClick={() => onProfileClick()}
              id="profile_icon"
            ></img>
          </div>
        </div>
      </div>
      {mouseHover && (
        <div className="menuDiv">
          <ul>
            <li>Order History</li>
            <li onClick={() => onClick("/manageInventry")}>Manage Inventry</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};
export default HeaderComponent;
