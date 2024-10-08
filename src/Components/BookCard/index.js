import React from "react";
import "./bookCard.css";
import RatingComponent from "../Rating";
import { Card, CardMedia } from "@mui/material";

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
            onClick={(e) => cardClick(e, index)}
            key={`${index}_${item.bookname}`}
          >
            <img
              src={
                `${process.env.REACT_APP_JSON_URL}${item.imageUrl}`
              }
              alt={item.title}
              style={{ height: "10rem", width: "10rem" }}
            />
            <div className="bookDetails">
              <label className={`label title truncate`}>
                <span>{item.bookName}</span>
              </label>
              {/* <label className={`label rating truncate`}>{item.rating}/5</label> */}
              <label className={`label price truncate`}>
                <span>₹{item.price}</span>
              </label>
              <label className={`label author truncate`}>
                <span>{item.authorName}</span>
              </label>
              {item.availableQuantity < 10 && item.availableQuantity > 0 ? (
                <label className={`label outOfStock truncate`}>
                  <span>Only {item.availableQuantity} Left</span>
                </label>
              ) : item.availableQuantity === 0 ? (
                <label className={`label outOfStock truncate`}>
                  <span>Out of stock</span>
                </label>
              ) : null}
              <RatingComponent
                rating={item.rating}
                ratings={item.totalRatings}
              />
            </div>
            <div className="buttonGroup">
              <button
                id="buyNow"
                onClick={() => buyNowClick(index)}
                disabled={item.availableQuantity === 0}
              >
                Buy Now
              </button>
              <button
                id="addToCart"
                onClick={() => addToCartClick(index)}
                disabled={item.availableQuantity === 0}
              >
                Add to cart
                <span style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <img
                    src="images/add-to-bag.png"
                    alt="Add to Cart"
                    width={18}
                    height={18}
                  />
                </span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookCardComponent;
