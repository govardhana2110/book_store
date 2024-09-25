import React from "react";
import HeaderComponent from "../../Components/Header";
import RatingComponent from "../../Components/Rating";
import { useSelector } from "react-redux";
import "./orderHistory.css";

const OrderHistoryComponent = () => {
  const storeData = useSelector((state) => state.cartItems);

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ color: "black" ,position:'absolute',top:'0%'}}>
        <h6 style={{ paddingTop: "3rem" }}>Order Histoty</h6>
        <div className="backGroundCard">
          {storeData.cartItems &&
            storeData.cartItems.map((item) => (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                  }}
                >
                  <div>
                    {" "}
                    <img
                      src={item.image}
                      alt="#"
                      height={150}
                      width={150}
                    ></img>
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
                      <RatingComponent
                        rating={item.rating}
                        ratings={item.ratings}
                      ></RatingComponent>

                      <label>Total Price :₹{item.price}</label>
                      <button>Remove</button>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </>
            ))}
        </div>
      </div>
    </>
  );
};
export default OrderHistoryComponent;
