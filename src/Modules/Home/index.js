import React from "react";
import BookCardComponent from "../../Components/BookCard";
import HeaderComponent from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../Store/CartItems";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const books = [
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
    { title: "Book", rating: "4", price: "50", author: "Me" },
  ];
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const addToCartClick = (id) => {
    // console.log("came in", storeData);
    dispatch(setCartItems(books[id]));
  };
  const buyNowClick = (id) => {
    dispatch(setCartItems(books[id]));
    navigate("/checkOut");
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
          ></BookCardComponent>
        </div>

        {/* <FooterComponent></FooterComponent> */}
      </div>
      {/* <FooterComponent></FooterComponent> */}
    </>
  );
};
export default HomeComponent;
