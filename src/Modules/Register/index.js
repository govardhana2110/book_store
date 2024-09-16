import React, { useState } from "react";
import InputComponent from "../../Components/Input";
import "./register.css";
import registerService from "../../Lib/Services/Login";
import DropdownComponent from "../../Components/Dropdown";

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
  const handleChange = (value, name) => {
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerClick = async (e) => {
    e.preventDefault();
    console.log(registerDetails);
    try {
      const response = await registerService(registerDetails);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="backGroundCard">
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
          <InputComponent
            value={registerDetails.userName}
            required={true}
            placeholder="User Name"
            onChange={(e) => handleChange(e.target.value, "userName")}
            type="text"
          ></InputComponent>
          <DropdownComponent options={userTypes}></DropdownComponent>
          <InputComponent
            value={registerDetails.phone}
            required={true}
            placeholder="Phone"
            onChange={(e) => handleChange(e.target.value, "phone")}
            type="number"
          ></InputComponent>
          <InputComponent
            value={registerDetails.email}
            required={true}
            placeholder="email"
            onChange={(e) => handleChange(e.target.value, "email")}
            type="text"
          ></InputComponent>
          <InputComponent
            value={registerDetails.password}
            required={true}
            placeholder="Password"
            onChange={(e) => handleChange(e.target.value, "password")}
            type="password"
          ></InputComponent>
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
            Back to <a href="#">Login</a>
          </label>
        </div>
      </form>
    </div>
  );
};
export default RegisterComponent;
