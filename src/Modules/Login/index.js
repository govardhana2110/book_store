import React, { useState } from "react";
import InputComponent from "../../Components/Input";
import "./login.css";
import loginService from "../../Lib/Services/Login";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (value, name) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginClick = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    localStorage.setItem("authToken", "jhghjgfyuuy");
    navigate("/home");
    try {
      const response = await loginService(loginDetails);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="backGroundCard">
      <form onSubmit={(e) => loginClick(e)}>
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
            Login
          </label>
          <InputComponent
            value={loginDetails.userName}
            required={true}
            placeholder="User Name"
            onChange={(e) => handleChange(e.target.value, "userName")}
            type="text"
          ></InputComponent>
          <InputComponent
            value={loginDetails.password}
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
              Submit
            </button>
          </div>
          <label style={{ color: "black", fontSize: "small" }}>
            New user ?{" "}
            <a href="/register" onClick={() => navigateToRegister()}>
              Register
            </a>{" "}
            Here
          </label>
        </div>
      </form>
    </div>
  );
};
export default LoginComponent;
