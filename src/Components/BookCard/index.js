import React from "react";
import "./bookCard.css";
import RatingComponent from "../Rating";
const BookCardComponent = ({
  data,
  addToCartClick,
  buyNowClick,
  onCardClick,
}) => {
  const cardClick = (e, id) => {
    if (e.target.id !== "buyNow" && e.target.id !== "addToCart") {
      onCardClick(id);
    }
  };
  return (
    <div className="mainDiv">
      {data &&
        data.map((item, index) => (
          <div
            className="bookCard"
            id="card"
            onClick={(e) => cardClick(e, index)}
          >
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
            <RatingComponent rating={2.5}></RatingComponent>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <button id="buyNow" onClick={() => buyNowClick(index)}>
                Buy Now
              </button>
              <button
                id="addToCart"
                onClick={() => addToCartClick(index)}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Add to cart{" "}
                <img
                  src="images/add-to-bag.png"
                  alt="#"
                  width={20}
                  height={20}
                ></img>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default BookCardComponent;
