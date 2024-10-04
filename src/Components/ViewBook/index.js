import React from "react";
import "./viewBook.css";
import RatingComponent from "../Rating";

const ViewBookComponent = ({ book }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "1rem",
        }}
      >
        <img
          src={`${process.env.REACT_APP_JSON_URL}${book.imageUrl}`}
          alt="#"
          height={200}
          width={150}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "flex-start",
          }}
        >
          <div className="bookName">{book.bookName}</div>
          <div className="authorName">{book.authorName}</div>
          <div className="price">₹{book.price}</div>
          <div className="rating">
            {book.rating}/{book.totalRatings}
          </div>
          <div className="status">{book.status}</div>
          {book.availableQuantity < 10 && book.availableQuantity > 0 ? (
            <label className="outOfStock">
              <span>Only {book.availableQuantity} Left</span>
            </label>
          ) : book.availableQuantity === 0 ? (
            <label className="outOfStock">
              <span>Out of stock</span>
            </label>
          ) : null}
          <div>
            <RatingComponent
              rating={book.rating}
              ratings={book.totalRatings}
            ></RatingComponent>
          </div>
        </div>
      </div>
      <hr style={{ color: "black", width: "100%" }}></hr>

      <div className="about">
        <label className="about">About the book </label>{" "}
      </div>
      <label className="description">{book.description}</label>
    </div>
  );
};
export default ViewBookComponent;
