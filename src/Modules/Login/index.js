import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./login.css";
import loginService from "../../Lib/Services/Login";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header";
import ButtonComponent from "../../Components/Button";
import NotifyComponent from "../../Components/Notify";
import LoaderComponent from "../../Components/Loader";
import Cookies from "js-cookie";

const LoginComponent = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
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
      const response = await loginService(loginDetails);
      console.log(response);
      if (response.status === 200) {
        Cookies.set("authToken", response.data.access_token);
        Cookies.set("role", response.data.role);
        Cookies.set("refreshToken", response.data.refresh_token)
        setnotifyType("success");
        setnotifyMessage("Login Successful");
        setLoader(false);
        setnotify(true);
        navigate("/home");
      } else {
        setnotifyType("error");
        setnotifyMessage("Login failed");
        setLoader(false);
        setnotify(true);
      }
    } catch (err) {
      console.log(err);
      setnotifyType("error");
      setnotifyMessage("Login failed");
      setLoader(false);
      setnotify(true);
    }
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    Cookies.remove('authToken');
    Cookies.remove('role');
    Cookies.remove('refreshToken')
   
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
              style={{ color: "black", fontSize: "larger", fontWeight: "700" }}
            >
              Login
            </label>
            <InputComponent
              value={loginDetails.username}
              required={true}
              placeholder="User Name"
              onChange={(e) => handleChange(e.target.value, "username")}
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
            <div style={{ display: "flex", justifyContent: "center" }}>
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
