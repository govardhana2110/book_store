import React, { useState } from "react";
import BookCardComponent from "../../Components/BookCard";
import HeaderComponent from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../Store/CartItems";
import { useNavigate } from "react-router-dom";
import ModelPopupComponent from "../../Components/PopupModel";
import PaginationComponent from "../../Components/Pagination";
import ViewBookComponent from "../../Components/ViewBook";

const HomeComponent = () => {
  const books = [
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const addToCartClick = (id) => {
    dispatch(setCartItems(books[id]));
  };
  const buyNowClick = (id) => {
    dispatch(setCartItems(books[id]));
    navigate("/checkOut");
  };
  const onCardClick = (id) => {
    setPopupData(books[id]);
    console.log(books[id]);
    setShowPopup(true);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div>
        <HeaderComponent></HeaderComponent>
        <div style={{ paddingTop: "4rem" }}>
          {" "}
          <BookCardComponent
            data={books}
            addToCartClick={addToCartClick}
            buyNowClick={buyNowClick}
            onCardClick={onCardClick}
          ></BookCardComponent>
        </div>
        <PaginationComponent data={books}></PaginationComponent>
      </div>
      {showPopup && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ModelPopupComponent onCloseClick={() => onCloseClick()}>
            <ViewBookComponent book={popupData}></ViewBookComponent>
          </ModelPopupComponent>
        </div>
      )}
    </>
  );
};
export default HomeComponent;
