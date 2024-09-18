import React from "react";
import TableComponent from "../../Components/Table";
import HeaderComponent from "../../Components/Header";

const ManageInventryComponent = () => {
  const booksData = [
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
    <>
      <HeaderComponent></HeaderComponent>
      <TableComponent data={booksData}></TableComponent>
    </>
  );
};
export default ManageInventryComponent;
