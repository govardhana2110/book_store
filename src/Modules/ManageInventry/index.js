import React from "react";
import TableComponent from "../../Components/Table";
import HeaderComponent from "../../Components/Header";

const ManageInventryComponent = () => {
  const booksData = [
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
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <h6 style={{ color: "black", paddingTop: "2rem" }}>Manage Inventry</h6>
      <button>Add Book</button>
      <TableComponent data={booksData}></TableComponent>
    </>
  );
};
export default ManageInventryComponent;
