import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import RatingComponent from "../../Components/Rating";
import { useSelector } from "react-redux";
import "./orderHistory.css";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";
import { useLocation } from "react-router-dom";

const OrderHistoryComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const location = useLocation();
  const [orderHistory, setOrderHistory] = useState([]);
  const getOrderHistory = async () => {
    try {
      const response = await getOrderHistoryService();
      setOrderHistory(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrderHistory();
  }, []);
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ color: "black", position: "absolute", top: "0%" }}>
        <h6 style={{ paddingTop: "3rem" }}>Order History</h6>
        <div className="backGroundCard">
          {orderHistory &&
            orderHistory.map((item) => (
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
                      <label>Total Quantity :{item.quantity}</label>
                      <label>Total Price :₹{item.price * item.quantity}</label>
                      <label>Status :{item.orderStatus}</label>
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
