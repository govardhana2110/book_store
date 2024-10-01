import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./login.css";
import loginService from "../../Lib/Services/Login";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
import ButtonComponent from "../../Components/Button";
import NotifyComponent from "../../Components/Notify";
import LoaderComponent from "../../Components/Loader";

const LoginComponent = () => {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const [notify, setnotify] = useState(false);
  const [notifyMessage, setnotifyMessage] = useState("");
  const [notifyType, setnotifyType] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (value, name) => {
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await loginService();
      const users = response.data;
      const user = users.find(
        (u) =>
          u.userName === loginDetails.userName &&
          u.password === loginDetails.password
      );

      if (user) {
        console.log(user);
        localStorage.setItem("authToken", "qwertyuiajndklahsfvgui");
        localStorage.setItem("role", user.role);
        setnotifyType("success");
        setnotifyMessage("Login Successful");
        setnotify(true);
        setTimeout(() => {
          setLoader(false);
          navigate("/home");
        },300);
      } else {
        setnotifyType("danger");
        setnotifyMessage("Login failed");
        setnotify(true);
        setLoader(false);
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
    localStorage.removeItem("role");
  }, []);
  return (
    <>
      {/* <HeaderComponent></HeaderComponent> */}
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
              label="User Name"
            ></InputComponent>
            <InputComponent
              value={loginDetails.password}
              required={true}
              placeholder="Password"
              onChange={(e) => handleChange(e.target.value, "password")}
              type="password"
              label="Password"
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
      {loader && <LoaderComponent></LoaderComponent>}{" "}
    </>
  );
};
export default LoginComponent;
