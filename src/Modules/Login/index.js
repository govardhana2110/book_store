import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./login.css";
import loginService from "../../Lib/Services/Login";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
import ButtonComponent from "../../Components/Button";
import NotifyComponent from "../../Components/Notify";

const LoginComponent = () => {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const [notify, setnotify] = useState(false);
  const [notifyMessage, setnotifyMessage] = useState("");
  const [notifyType, setnotifyType] = useState("");

  const navigate = useNavigate();
  const handleChange = (value, name) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService();
      const users = response.data;
      const user = users.find(
        (u) =>
          u.username === loginDetails.username &&
          u.password === loginDetails.password
      );

      if (user) {
        localStorage.setItem("authToken", "qwertyuiajndklahsfvgui");
        localStorage.setItem("role", user.role);
        setnotifyType("success");
        setnotifyMessage("Login Successful");
        setnotify(true);
        navigate("/home");
      } else {
        setnotifyType("danger");
        setnotifyMessage("Login failed");
        setnotify(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
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
              <ButtonComponent type="submit" name="Login"></ButtonComponent>
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
      {notify && (
        <NotifyComponent
          type={notifyType}
          show={notify}
          message={notifyMessage}
        ></NotifyComponent>
      )}
    </>
  );
};
export default LoginComponent;
