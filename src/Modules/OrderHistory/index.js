import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import RatingComponent from "../../Components/Rating";
import { useSelector } from "react-redux";
import "./orderHistory.css";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";

const OrderHistoryComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
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
      <HeaderComponent />
      <div style={{ color: "black", position: "relative", padding: "2rem" }}>
        <h6>Order History</h6>
        <div className="backGroundCard">
          {orderHistory && orderHistory.map((item) => (
            <>
            <div className="orderItem" key={item.id}>
              <div className="orderImage">
                <img
                  src={`${process.env.REACT_APP_JSON_URL}${item.imageUrl}`}
                  alt="#"
                  height={150}
                  width={150}
                />
              </div>
              <div className="orderDetails">
                <label className="bookName">{item.bookName}</label>
                <label className="authorName">{item.authorName}</label>
                <label className="about">Description:</label>
                <label className="description">{item.description}</label>
                <label className="price">₹{item.price}</label>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "smaller", flexWrap: "wrap" }}>
                  <RatingComponent rating={item.rating} ratings={item.totalRatings} />
                  <label className="labelName">Total Quantity: {item.quantity}</label>
                  <label className="labelName">Total Price: ₹{item.price * item.quantity}</label>
                  <label className="labelName">Status: {item.orderStatus}</label>
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
