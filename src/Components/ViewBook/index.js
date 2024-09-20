import React from "react";
import "./viewBook.css";

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

        <div> {book.title} uyqwire ywieuyw uioeer ytiuperp tieuri</div>
      </div>
      <div> Bottom Div</div>
    </div>
  );
};
export default ViewBookComponent;
