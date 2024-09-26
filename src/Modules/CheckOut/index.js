import React, { useState } from "react";
import HeaderComponent from "../../Components/Header";
import "./checkOut.css";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../../Components/Rating";
import ModelPopupComponent from "../../Components/PopupModel";
import { setCartItems } from "../../Store/CartItems";

const CheckOutComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const onBuyClick = () => {
    setShowPopup(true);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  const onRemoveClick = (id) => {
    var storeArr = [...storeData.cartItems];
    storeArr.splice(id, 1);
    dispatch(setCartItems(storeArr));
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "0%",
        }}
      >
        <h6 style={{ paddingTop: "3rem" }}>My Shopping cart</h6>
        <div className="backGroundCard">
          {storeData.cartItems &&
            storeData.cartItems.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "2rem",
                }}
              >
                <div>
                  {" "}
                  <img src={item.image} alt="#" height={150} width={150}></img>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <label>{item.title}</label>
                  <label>By:{item.author}</label>
                  <label>Description:</label>
                  <label>₹{item.price}</label>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: "smaller",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <button>-</button>
                      <span></span>
                      <button>+</button>
                    </div>
                    <RatingComponent
                      rating={item.rating}
                      ratings={item.ratings}
                    ></RatingComponent>

                    <label>Total Price :₹{item.price}</label>
                    <button onClick={() => onRemoveClick(index)}>Remove</button>
                  </div>
                  <hr style={{ color: "black", width: "100%" }}></hr>

                </div>
              </div>
            ))}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Total Items:{}</label>
              <label>Total Gross:₹{}</label>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <label>Delivery Charges:₹{}</label>
              <label>CGST(18%):₹{}</label>
              <label>SGST(18%):₹{}</label>
              <label>Amount Payable:₹{}</label>
              <button onClick={() => onBuyClick()}>Buy</button>
            </div>
          </div>
        </div>
        {showPopup && (
          <ModelPopupComponent
            onCloseClick={onCloseClick}
          ></ModelPopupComponent>
        )}
      </div>
    </>
  );
};
export default CheckOutComponent;
