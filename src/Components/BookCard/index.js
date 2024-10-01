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
            onClick={(e) => cardClick(e, index)}
            key={index}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ height: "10rem", width: "10rem" }}
            />
            <div className="bookDetails">
              <label className={`label title truncate`}>
                <span>{item.title}</span>
              </label>
              <label className={`label rating truncate`}>{item.rating}/5</label>
              <label className={`label price truncate`}>
                <span>₹{item.price}</span>
              </label>
              <label className={`label author truncate`}>
                <span>{item.author}</span>
              </label>
              <RatingComponent rating={item.rating} ratings={item.ratings} />
            </div>
            <div className="buttonGroup">
              <button id="buyNow" onClick={() => buyNowClick(index)}>
                Buy Now
              </button>

              <button id="addToCart" onClick={() => addToCartClick(index)}>
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
