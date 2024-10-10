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
import getCartItemsService from "../../Lib/Services/GetCartItems";
import updateBookService from "../../Lib/Services/UpdateBook";
import getAllBooksService from "../../Lib/Services/GetAllBooks";

const CheckOutComponent = () => {
  const storeData = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [fewLeft, setFewLeft] = useState(false);
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
  const updateCartItems = async (data, id) => {
    try {
      const response = await updateCartItemService(data, id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const onQuantityReduce = (ind) => {
    let dataArr = [...storeData.cartItems];
    setFewLeft(false);

    const itemIndex = dataArr.findIndex((item) => item.id === ind);
    if (dataArr[itemIndex].quantity > 1) {
      let updatedItem = {
        ...dataArr[itemIndex],
        quantity: dataArr[itemIndex].quantity - 1,
      };

      dataArr[itemIndex] = updatedItem;
      updateCartItems(updatedItem.quantity, updatedItem.id);
    }
    dispatch(setCartItems(dataArr));
  };
  const onQuantityIncrease = (ind) => {
    let dataArr = [...storeData.cartItems];
    const itemIndex = dataArr.findIndex((item) => item.id === ind);
    const bookData = booksData.filter(
      (item) => dataArr[itemIndex].bookName === item.bookName
    );
    if (bookData[0].availableQuantity > dataArr[itemIndex].quantity) {
      setFewLeft(false);

      let updatedItem = {
        ...dataArr[itemIndex],
        quantity: dataArr[itemIndex].quantity + 1,
        orderStatus: "Pending",
      };
      dataArr[itemIndex] = updatedItem;
      updateCartItems(updatedItem.quantity, updatedItem.id);
      dispatch(setCartItems(dataArr));
    } else {
      setFewLeft(true);
    }
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
    getBooksData();
  }, [storeData]);
  const getBooksData = async () => {
    try {
      const response = await getAllBooksService();
      setBooksData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateInventry = async (name, purchased) => {
    const book = booksData.filter((item) => item.bookName === name);
    const bookId = book[0]["id"];
    book[0]["image"] = book[0]["imageUrl"];
    book[0]["availableQuantity"] = book[0]["availableQuantity"] - purchased;
    delete book[0]["imageUrl"];
    delete book[0]["id"];
    const multiPartData = new FormData();
    for (const key in book[0]) {
      multiPartData.append(key, book[0][key]);
    }
    try {
      const response = await updateBookService(multiPartData, bookId);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const orderSubmitCallBack = async () => {
    try {
      let obj = {
        ...storeData.cartItems[0],
        orderStatus: "placed",
        orderedDate: new Date(),
      };
      const response = await placeOrderService(obj);
      console.log(obj);
      if (response.status === 201) {
        updateInventry(obj.bookName, obj.quantity);
      }
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
                  <label className="rating">{item.rating}/5</label>
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
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                          gap: "0.2rem",
                        }}
                      >
                        <button
                          style={{ padding: "0.3rem" }}
                          onClick={() => onQuantityReduce(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          style={{ padding: "0.3rem" }}
                          onClick={() => onQuantityIncrease(item.id)}
                        >
                          +
                        </button>
                      </div>{" "}
                      {fewLeft && (
                        <label className="fewLeft">
                          Only {item.quantity} left
                        </label>
                      )}
                    </div>

                    <RatingComponent
                      rating={item.rating}
                      ratings={item.totalRatings}
                    ></RatingComponent>

                    <label className="labelName">
                      Total Price :₹
                      {item.price * item.quantity}
                    </label>
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
              <label className="labelName">Total Items:{totalItems}</label>
              <label className="labelName">Gross Total:₹{totalPrice}</label>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <label className="labelName">
                Delivery Charges:₹{storeData.cartItems.length ? 43.6 : 0}
              </label>
              <label className="labelName">
                CGST(18%):₹{(0.18 * totalPrice).toFixed(2)}
              </label>
              <label className="labelName">
                SGST(18%):₹{(0.18 * totalPrice).toFixed(2)}
              </label>
              <label className="labelName">
                Amount Payable:₹
                {(
                  totalPrice +
                  0.18 * totalPrice * 2 +
                  (storeData.cartItems.length ? 43.6 : 0)
                ).toFixed(2)}
              </label>
              &nbsp;
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
