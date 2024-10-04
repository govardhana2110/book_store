import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import RatingComponent from "../../Components/Rating";
import { useSelector } from "react-redux";
import "./updateOrders.css";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";
import DropdownComponent from "../../Components/Dropdown";
import ButtonComponent from "../../Components/Button";
import updateOrderService from "../../Lib/Services/UpdateOrder";
import NotifyComponent from "../../Components/Notify";
import LoaderComponent from "../../Components/Loader";

const UpdateOrderComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderStatusValue, setOrderStatusValue] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [notify, setnotify] = useState(false);
  const [notifyMessage, setnotifyMessage] = useState("");
  const [notifyType, setnotifyType] = useState("");
  const [loader, setLoader] = useState(false);

  const orderStatus = [
    { name: "Placed", value: "Placed" },
    { name: "Confirmed", value: "Confirmed" },
    { name: "Processing", value: "Processing" },
    { name: "Shipped", value: "Shipped" },
    { name: "In transit", value: "inTransit" },
    { name: "Out for delivery", value: "outForDelivery" },
    { name: "Delivered", value: "Delivered" },
    { name: "Cancelled", value: "Cancelled" },
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
    console.log(data);
    setLoader(true);
    try {
      const response = await updateOrderService(orderStatusValue, data.id);
      console.log(response);
      setTimeout(() => {
        setLoader(false);
        setnotifyType("success");
        setnotifyMessage("Order Updated Successfully");
        setnotify(true);
      }, 300);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setLoader(false);
        setnotifyType("error");
        setnotifyMessage("Failed to update order");
        setnotify(true);
      }, 300);
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
                      src={
                        item.imageUrl
                          ? `${process.env.REACT_APP_JSON_URL}${item.imageUrl}`
                          : null
                      }
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
                    <label className="bookName">{item.bookName}</label>
                    <label className="authorName">By:{item.authorName}</label>
                    <label className="about">Description:</label>
                    <label className="description">{item.description}</label>
                    <label className="price">₹{item.price}</label>
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
                        ratings={item.totalRatings}
                      ></RatingComponent>
                      <label className="labelName">
                        Total Quantity :{item.quantity}
                      </label>
                      <label className="labelName">
                        Total Price :₹{item.price * item.quantity}
                      </label>
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
      {notify && (
        <NotifyComponent
          message={notifyMessage}
          type={notifyType}
          show={notify}
        ></NotifyComponent>
      )}
      {loader && <LoaderComponent></LoaderComponent>}
    </>
  );
};
export default UpdateOrderComponent;
