import React, { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getCartItemsService from "../../Lib/Services/GetCartItems";
import { setCartItems } from "../../Store/CartItems";
import Cookies from "js-cookie";

const HeaderComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [mouseHover, setMouseHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCartItems();
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

  const getCartItems = async () => {
    try {
      const response = await getCartItemsService();
      dispatch(setCartItems(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  const onProfileClick = () => {
    setMouseHover((prev) => !prev);
  };
  const onClick = (route) => {
    navigate(route);
  };
  const checkOutClick = () => {
    navigate("/checkOut");
  };
  const onHomeClick = () => {
    navigate("/home");
  };
  const logoutClick = () => {
    Cookies.remove("authToken");
    Cookies.remove("role");
    Cookies.remove("refreshToken");
    navigate("/login");
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
            className="logo"
            style={{ padding: "0.7rem 0.5rem 0.5rem 1.5rem" }}
          >
            <img
              src="images/daimlerImage1.png"
              alt="#"
              style={{ height: "2rem", width: "11rem" }}
              onClick={() => onHomeClick()}
            ></img>
          </div>
          {/* <label style={{ display: "flex", alignItems: "center" }}>
            Online Book store
          </label> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "2rem",
              gap: "1rem",
            }}
          >
            {" "}
            <img
              className="profileIco"
              src="images/shopping-bag.png"
              // src="images/cart.png"
              alt="#"
              style={{ height: "1.5rem", width: "1.5rem" }}
              onClick={() => checkOutClick()}
              id="cart_icon"
            ></img>
            <img
              className="profileIco"
              src="images/profile.ico"
              alt="#"
              style={{ height: "2rem", width: "2rem" }}
              onClick={() => onProfileClick()}
              id="profile_icon"
            ></img>
            <label
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "100%",
                width: "0.9rem",
                height: "0.9rem",
                fontSize: "10px",
                position: "fixed",
                top: "5px",
              }}
            >
              {storeData.cartItems.length}
            </label>
          </div>
        </div>
      </div>
      {mouseHover && (
        <div className="menuDiv">
          <label
            style={{ cursor: "pointer" }}
            onClick={() => onClick("/orderHistory")}
          >
            Order History
          </label>
          <hr style={{ color: "black", width: "100%" }}></hr>{" "}
          {Cookies.get("role") === "ADMIN" && (
            <>
              <label
                style={{ cursor: "pointer" }}
                onClick={() => onClick("/manageInventry")}
              >
                Manage Inventry
              </label>
              <hr style={{ color: "black", width: "100%" }}></hr>
              <label
                style={{ cursor: "pointer" }}
                onClick={() => onClick("/salesStatistics")}
              >
                Sales Statistics
              </label>
              <hr style={{ color: "black", width: "100%" }}></hr>
              <label
                style={{ cursor: "pointer" }}
                onClick={() => onClick("/updateOrder")}
              >
                Update Orders
              </label>
              <hr style={{ color: "black", width: "100%" }}></hr>
            </>
          )}
          <label style={{ cursor: "pointer" }} onClick={() => logoutClick()}>
            Logout
          </label>
        </div>
      )}
    </>
  );
};
export default HeaderComponent;
