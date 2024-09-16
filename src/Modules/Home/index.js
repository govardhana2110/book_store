import React from "react";
import BookCardComponent from "../../Components/BookCard";
import HeaderComponent from "../../Components/Header";

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
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <label style={{ color: "black" }}>Home Component</label>{" "}
      <BookCardComponent data={books}></BookCardComponent>
    </div>
  );
};
export default HomeComponent;
