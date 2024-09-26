import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./login.css";
import loginService from "../../Lib/Services/Login";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
import ButtonComponent from "../../Components/Button";

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
  useEffect(()=>{localStorage.removeItem('authToken')},[])
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="loginGroundCard">
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
             
              <ButtonComponent type='submit' name='Login'></ButtonComponent>
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
    </>
  );
};
export default LoginComponent;
