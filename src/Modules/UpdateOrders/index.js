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
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState("");
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
    setLoader(true);
    try {
      const response = await updateOrderService(orderStatusValue, data.id);
      setLoader(false);
      setNotifyType("success");
      setNotifyMessage("Order Updated Successfully");
      setNotify(true);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setNotifyType("error");
      setNotifyMessage("Failed to update order");
      setNotify(true);
    }
  };

  const onDroDownChange = (e, id) => {
    setOrderId(id);
    setOrderStatusValue(e.target.value);
  };

  return (
    <>
      <HeaderComponent />
      <div style={{ color: "black", position: "relative", padding: "2rem 0" }}>
        <h6 style={{ paddingTop: "3rem" }}>Manage Order</h6>
        <div className="backGroundCard">
          {orderHistory &&
            orderHistory.map((item, index) => (
              <>
                <div className="orderItem" key={item.id}>
                  <div className="orderImage">
                    <img
                      src={
                        item.imageUrl
                          ? `${process.env.REACT_APP_JSON_URL}${item.imageUrl}`
                          : null
                      }
                      alt="#"
                      height={150}
                    />
                  </div>
                  <div className="orderDetails">
                    <label className="bookName">{item.bookName}</label>
                    <label className="authorName">By: {item.authorName}</label>
                    <label className="about">Description:</label>
                    <label className="description">{item.description}</label>
                    <label className="price">₹{item.price}</label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        fontSize: "smaller",
                        flexWrap: "wrap",
                      }}
                    >
                      <RatingComponent
                        rating={item.rating}
                        ratings={item.totalRatings}
                      />
                      <label className="labelName">
                        Total Quantity: {item.quantity}
                      </label>
                      <label className="labelName">
                        Total Price: ₹{item.price * item.quantity}
                      </label>
                      <DropdownComponent
                        options={orderStatus}
                        placeHolder="Select status"
                        value={
                          (orderId === index && orderStatusValue) ||
                          item.orderStatus
                        }
                        onChange={(e) => onDroDownChange(e, index)}
                      />
                      <ButtonComponent
                        name="Update"
                        onClick={() => onOrderUpdateClick(item)}
                      />
                    </div>
                  </div>
                </div>
                <hr style={{color:'black',width:'100%'}}></hr>
              </>
            ))}
        </div>
      </div>
      {notify && (
        <NotifyComponent
          message={notifyMessage}
          type={notifyType}
          show={notify}
        />
      )}
      {loader && <LoaderComponent />}
    </>
  );
};

export default UpdateOrderComponent;
