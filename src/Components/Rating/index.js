import React from "react";
import "./rating.css";
const RatingComponent = ({ rating, ratings }) => {
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <div className="starDiv">{stars}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          fontSize: "small",
          alignItems: "center",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            background: "green",
            color: "white",
            padding: "4px",
            borderRadius: "3px",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {rating}
          <div className="star"></div>
        </div>
        &nbsp;
        <div>({ratings})</div>
      </div>
    </div>
  );
};
export default RatingComponent;
