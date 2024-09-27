import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import "./checkOut.css";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../../Components/Rating";
import ModelPopupComponent from "../../Components/PopupModel";
import { setCartItems } from "../../Store/CartItems";
import deleteCartItemService from "../../Lib/Services/DeleteCartItem";
import updateCartItemService from "../../Lib/Services/UpdateCartItems";
import PaymentCardComponent from "../../Components/PaymentCard";
import placeOrderService from "../../Lib/Services/PlaceOrder";

const CheckOutComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const onBuyClick = () => {
    setShowPopup(true);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  const onRemoveClick = (index) => {
    var storeArr = [...storeData.cartItems];
    removeCartItem(storeArr[index]);
    storeArr.splice(index, 1);
    dispatch(setCartItems(storeArr));
  };
  const removeCartItem = async (data) => {
    try {
      const response = await deleteCartItemService(data.id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateCartItems = async (data) => {
    try {
      const response = await updateCartItemService(data, data.id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const onQuantityReduce = (ind) => {
    let dataArr = [...storeData.cartItems];
    const itemIndex = dataArr.findIndex((item) => item.id === ind);
    if (dataArr[itemIndex].quantity > 1) {
      let updatedItem = {
        ...dataArr[itemIndex],
        quantity: dataArr[itemIndex].quantity - 1,
      };

      dataArr[itemIndex] = updatedItem;
      updateCartItems(dataArr[itemIndex]);
    }
    dispatch(setCartItems(dataArr));
  };
  const onQuantityIncrease = (ind) => {
    let dataArr = [...storeData.cartItems];
    const itemIndex = dataArr.findIndex((item) => item.id === ind);
    let updatedItem = {
      ...dataArr[itemIndex],
      quantity: dataArr[itemIndex].quantity + 1,
    };
    dataArr[itemIndex] = updatedItem;
    updateCartItems(dataArr[itemIndex]);
    dispatch(setCartItems(dataArr));
  };
  useEffect(() => {
    var price = 0;
    var items = 0;
    storeData.cartItems.map((item) => {
      price = price + item.price * item.quantity;
      items = items + item.quantity;
    });
    setTotalPrice(price);
    setTotalItems(items);
  }, [storeData]);
  const orderSubmitCallBack = async () => {
    try {
      let obj = {
        ...storeData.cartItems[0],
        orderStatus: "placed",
      };
      console.log(obj)
      const response = await placeOrderService(obj);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
                  <label>Description:{item.description}</label>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "0.2rem",
                      }}
                    >
                      <button onClick={() => onQuantityReduce(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onQuantityIncrease(item.id)}>
                        +
                      </button>
                    </div>
                    <RatingComponent
                      rating={item.rating}
                      ratings={item.ratings}
                    ></RatingComponent>

                    <label>Total Price :₹{item.price * item.quantity}</label>
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
              <label>Total Items:{totalItems}</label>
              <label>Total Gross:₹{totalPrice}</label>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <label>
                Delivery Charges:₹{storeData.cartItems.length ? 43.6 : 0}
              </label>
              <label>CGST(18%):₹{(0.18 * totalPrice).toFixed(2)}</label>
              <label>SGST(18%):₹{(0.18 * totalPrice).toFixed(2)}</label>
              <label>
                Amount Payable:₹
                {(
                  totalPrice +
                  0.18 * totalPrice * 2 +
                  (storeData.cartItems.length ? 43.6 : 0)
                ).toFixed(2)}
              </label>
              <button onClick={() => onBuyClick()}>Buy</button>
            </div>
          </div>
        </div>
        {showPopup && (
          <ModelPopupComponent onCloseClick={onCloseClick}>
            <PaymentCardComponent
              orderSubmitCallBack={orderSubmitCallBack}
            ></PaymentCardComponent>
          </ModelPopupComponent>
        )}
      </div>
    </>
  );
};
export default CheckOutComponent;
