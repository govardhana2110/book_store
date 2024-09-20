import React from "react";
import "./rating.css";
const RatingComponent = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    return (
      <div
        key={index}
        className="star"
        style={{
          background: `linear-gradient(90deg, gold ${fillPercentage}%, grey ${fillPercentage}%)`,
        }}
      ></div>
    );
  });
  return <div className="starDiv">{stars}</div>;
};
export default RatingComponent;
