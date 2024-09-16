import React from "react";
import "./bookCard.css";
const BookCardComponent = ({ data }) => {
  return (
    <div className="mainDiv">
      {data &&
        data.map((item) => (
          <div className="bookCard">
            {" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="images/book image.jpg"
                alt="#"
                style={{ height: "7rem", width: "5rem" }}
              ></img>
            </div>
            <label>Title: {item.title}</label>
            <label>Rating: {item.rating}</label>
            <label>Price: {item.price}</label>
            <label>Author: {item.author}</label>
            <button>Add to cart +</button>
          </div>
        ))}
    </div>
  );
};
export default BookCardComponent;
