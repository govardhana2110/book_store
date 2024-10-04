import React, { useState } from "react";
import InputComponent from "../Input";
import ButtonComponent from "../Button";

const PaymentCardComponent = ({ orderSubmitCallBack }) => {
  const [cardDetails, setcardDetails] = useState({
    cardNo: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const renderInput = (name, label) => {
    return (
      <InputComponent
        placeholder={`Enter ${name}`}
        value={cardDetails[name]}
        onChange={(e) => inputChange(e, name)}
        label={label}
        type={
          name === "cardNo" ? "number" : name === "expiryDate" ? "date" : "text"
        }
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
      <label className="labelname">Payment</label>
      {renderInput("cardNo", "Card No")}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>{renderInput("expiryDate", "Expiry Date")}</div>

        <div>{renderInput("cvv", "CVV")} </div>
      </div>
      {renderInput("name", "Name")}{" "}
      <ButtonComponent
        name="Place order"
        onClick={() => orderSubmitCallBack()}
      ></ButtonComponent>
    </div>
  );
};
export default PaymentCardComponent;
