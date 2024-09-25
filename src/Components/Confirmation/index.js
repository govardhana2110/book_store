import React from "react";
import "./confirmation.css";

const ConfirmationComponent = ({
  title,
  onCloseConfirmClick,
  onNoClick,
  onYesClick,
}) => {
  return (
    <div className="blurBackground">
      <div className="contentBody">
        {" "}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          onClick={() => onCloseConfirmClick()}
        >
          <img
            style={{ cursor: "pointer" }}
            src="images/cross-black.png"
            alt="#"
            height={15}
            width={15}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <h5>Confirmation</h5>
          <h6>{title}</h6>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              gap: "2rem",
            }}
          >
            {" "}
            <button onClick={() => onYesClick()}>Yes</button>
            <button onClick={() => onNoClick()}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationComponent;
