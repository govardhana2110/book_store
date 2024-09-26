import React, { useState } from "react";
import InputComponent from "../../Components/Input";
import "./register.css";
import registerService from "../../Lib/Services/Login";
import DropdownComponent from "../../Components/Dropdown";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    phone: "",
    userName: "",
    password: "",
    userType: "",
  });
  const userTypes = [
    { name: "Admin", value: "admin" },
    { name: "User", value: "user" },
  ];
  const navigate = useNavigate();
  const renderInput = (name, type) => {
    return (
      <InputComponent
        value={registerDetails[name]}
        required={true}
        placeholder={name}
        onChange={(e) => handleChange(e.target.value, name)}
        type={type}
      ></InputComponent>
    );
  };
  const handleChange = (value, name) => {
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerClick = async (e) => {
    e.preventDefault();
    try {
      const response = await registerService(registerDetails);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const backToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="registerBackGroundCard">
      <form onSubmit={(e) => registerClick(e)}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label
            style={{ color: "black", fontSize: "larger", fontWeight: "600" }}
          >
            Register
          </label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {renderInput("userName", "text")}
              <DropdownComponent
                options={userTypes}
                placeHolder="Select"
              ></DropdownComponent>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {renderInput("phone", "number")}
              {renderInput("email", "text")}
            </div>
            {renderInput("password", "password")}
          </div>

          <div>
            <button
              type="submit"
              style={{
                color: "white",
                borderRadius: "10%",
                background: "blue",
                borderColor: "blue",
              }}
            >
              Register
            </button>
          </div>
          <label style={{ color: "black", fontSize: "small" }}>
            Back to{" "}
            <a href="/login" onClick={() => backToLogin()}>
              Login
            </a>
          </label>
        </div>
      </form>
    </div>
  );
};
export default RegisterComponent;
