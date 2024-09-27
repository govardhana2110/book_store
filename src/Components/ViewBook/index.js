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
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <img src={book.image} alt="#" height={200} width={150}></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1rem",
            textAlign:'left',
            alignItems:'flex-start'
          }}
        >
          <div> {book.title}</div>
          <div>By:{book.author}</div>
          <div>Price:₹{book.price}</div>
          <div>Rating:{book.rating}</div>
          <div>Availability:{book.status}</div>
          <div>
            <RatingComponent
              rating={book.rating}
              ratings={book.ratings}
            ></RatingComponent>
          </div>
        </div>
      </div>
      <hr  style={{color:'black', width:'100%'}}></hr>

      <div>Description: {book.description}</div>
    </div>
  );
};
export default ViewBookComponent;
