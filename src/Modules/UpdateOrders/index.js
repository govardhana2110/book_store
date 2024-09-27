import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import RatingComponent from "../../Components/Rating";
import { useSelector } from "react-redux";
import "./updateOrders.css";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";
import DropdownComponent from "../../Components/Dropdown";
import ButtonComponent from "../../Components/Button";
import updateOrderService from "../../Lib/Services/UpdateOrder";

const UpdateOrderComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderStatusValue, setOrderStatusValue] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const orderStatus = [
    { name: "Placed", value: "placed" },
    { name: "Confirmed", value: "confirmed" },
    { name: "Processing", value: "processing" },
    { name: "Shipped", value: "shipped" },
    { name: "In transit", value: "inTransit" },
    { name: "Out for delivery", value: "outForDelivery" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ];
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
  const onOrderUpdateClick = async (data) => {
    try {
      const response = await updateOrderService(
        { ...data, orderStatus: orderStatusValue },
        data.id
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const onDroDownChange = (e, id) => {
    setOrderId(id);
    setOrderStatusValue(e.target.value);
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ color: "black", position: "absolute", top: "0%" }}>
        <h6 style={{ paddingTop: "3rem" }}>Manage Order</h6>
        <div className="backGroundCard">
          {orderHistory &&
            orderHistory.map((item, index) => (
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
                      <label>Total Quantity :₹{item.quantity}</label>
                      <label>Total Price :₹{item.price * item.quantity}</label>
                      <div>
                        {" "}
                        <DropdownComponent
                          options={orderStatus}
                          placeHolder="Select status"
                          value={
                            (orderId === index && orderStatusValue) ||
                            item.orderStatus
                          }
                          onChange={(e) => onDroDownChange(e, index)}
                        ></DropdownComponent>{" "}
                      </div>
                      <ButtonComponent
                        name="Update"
                        onClick={() => onOrderUpdateClick(item)}
                      ></ButtonComponent>
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
export default UpdateOrderComponent;
