import React, { useState } from "react";
import InputComponent from "../Input";
import ButtonComponent from "../Button";

const PaymentCardComponent = ({orderSubmitCallBack}) => {
  const [cardDetails, setcardDetails] = useState({
    cardNo: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const renderInput = (name) => {
    return (
      <InputComponent
        placeholder={`Enter ${name}`}
        value={cardDetails[name]}
        onChange={(e) => inputChange(e, name)}
        type={name === "cardNo" ? "number" :name === "expiryDate" ? "date" : "text"}
      ></InputComponent>
    );
  };
  const inputChange = (e, name) => {
    setcardDetails((prev) => ({ ...prev, [name]: e.target.value }));
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {renderInput("cardNo")}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{renderInput("expiryDate")}</div>

        <div>{renderInput("cvv")} </div>
      </div>
      {renderInput("name")}{" "}
      <ButtonComponent name="Place order" onClick={()=>orderSubmitCallBack()}></ButtonComponent>
    </div>
  );
};
export default PaymentCardComponent;
