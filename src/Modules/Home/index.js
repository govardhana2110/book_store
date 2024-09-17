import React from "react";
import BookCardComponent from "../../Components/BookCard";
import HeaderComponent from "../../Components/Header";
import FooterComponent from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {  setCartItems } from "../../Store/CartItems";

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
  const storeData = useSelector((state)=>state.cartItems);
  const addToCartClick = (id) => {
    // console.log("came in", storeData);
    dispatch(setCartItems(books[id]));
  };
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <label style={{ color: "black" }}>Home Component</label>{" "}
      <BookCardComponent
        data={books}
        addToCartClick={addToCartClick}
      ></BookCardComponent>
      <FooterComponent></FooterComponent>
    </div>
  );
};
export default HomeComponent;
