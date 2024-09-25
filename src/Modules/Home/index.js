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
import SearchComponent from "../../Components/Search";
import DropdownComponent from "../../Components/Dropdown";

const HomeComponent = () => {
  const books = [
    {
      title: "Book 1",
      rating: "4.3",
      price: "502",
      author: "Me and someone jhskdgf sdfhgsdf sdkjfhsdkjf ksjdhf sdfkj kjh",
      image: "images/book image.jpg",
      ratings: "400",
    },
    {
      title: "Book 3",
      rating: "4.2",
      price: "505",
      author: "som eone",
      image: "images/book image.jpg",
      ratings: "408",
    },
    {
      title: "Book jhadf",
      rating: "4.6",
      price: "50876",
      author: "Me and also",
      image: "images/book image.jpg",
      ratings: "490",
    },
    {
      title: "Book 8",
      rating: "4.9",
      price: "5087687",
      author: "every one",
      image: "images/book image.jpg",
      ratings: "404",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "460",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "430",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "4090",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "40390",
    },
    {
      title: "Book",
      rating: "4",
      price: "50",
      author: "Me",
      image: "images/book image.jpg",
      ratings: "480",
    },
  ];
  const categories = [
    { name: "Funny", value: "funny" },
    { name: "Crime", value: "crime" },
    { name: "Thriller", value: "thriller" },
    { name: "Horror", value: "horror" },
    { name: "History", value: "history" },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const [booksdata, setBooksData] = useState([...books]);
  const addToCartClick = (id) => {
    let data = [...storeData.cartItems, books[id]];
    console.log(data);
    dispatch(setCartItems(data));
  };
  const buyNowClick = (id) => {
    dispatch(setCartItems(books[id]));
    navigate("/checkOut");
  };
  const onCardClick = (id) => {
    setPopupData(books[id]);
    setShowPopup(true);
  };
  const onCloseClick = () => {
    setShowPopup(false);
  };
  const filteredCallBack = (data) => {
    setBooksData([...data]);
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ paddingTop: "4rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 7rem 0rem 7rem",
            flexWrap: "wrap",
            color: "black",
          }}
        >
          <SearchComponent
            data={books}
            filteredCallBack={filteredCallBack}
          ></SearchComponent>
          <label>
            Sort By <DropdownComponent options={categories}></DropdownComponent>
          </label>
        </div>
        <BookCardComponent
          data={booksdata}
          addToCartClick={addToCartClick}
          buyNowClick={buyNowClick}
          onCardClick={onCardClick}
        ></BookCardComponent>
      </div>
      <PaginationComponent data={booksdata} />

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
