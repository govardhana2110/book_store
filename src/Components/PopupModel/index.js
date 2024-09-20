import React from "react";
import "./popupModel.css";

const ModelPopupComponent = ({ children,onCloseClick }) => {
  return (
    <div className="blurBackground">
      <div className="contentBody">
        {" "}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          onClick={()=>onCloseClick()}
        >
          <img
            style={{ cursor:'pointer' }}
            src="images/cross-black.png"
            alt="#"
            height={15}
            width={15}
          ></img>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModelPopupComponent;
