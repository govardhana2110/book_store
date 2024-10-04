import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./register.css";
import DropdownComponent from "../../Components/Dropdown";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Components/Button";
import HeaderComponent from "../../Components/Header";
import loginService from "../../Lib/Services/Login";
import registerService from "../../Lib/Services/Register";
import NotifyComponent from "../../Components/Notify";
import LoaderComponent from "../../Components/Loader";
import axios from "axios";

const RegisterComponent = () => {
  const [registerDetails, setRegisterDetails] = useState({
    // email: "",
    // phone: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "USER",
  });
  const userTypes = [
    { name: "Admin", value: "ADMIN" },
    { name: "User", value: "USER" },
  ];
  const [usersList, setUsersList] = useState(0);
  const [notify, setnotify] = useState(false);
  const [notifyMessage, setnotifyMessage] = useState("");
  const [notifyType, setnotifyType] = useState("");
  const [loader, setLoader] = useState(false);
  const getUsersList = async () => {
    try {
      const response = await loginService();
      setUsersList(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);
  const navigate = useNavigate();
  const renderInput = (name, type, label) => {
    return (
      <InputComponent
        value={registerDetails[name]}
        required={true}
        placeholder={label}
        onChange={(e) => handleChange(e.target.value, name)}
        type={type}
        label={label}
      ></InputComponent>
    );
  };
  const handleChange = (value, name) => {
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      let obj = {
        ...registerDetails,
      };
      const response = await registerService(obj);
      console.log(response);
      setTimeout(() => {
        setLoader(false);
        setnotifyType("success");
        setnotifyMessage("Registration Successfully");
        setnotify(true);
      }, 300);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setLoader(false);
        setnotifyType("warning");
        setnotifyMessage("Registration failed");
        setnotify(true);
      }, 300);
    }
  };
  const backToLogin = () => {
    navigate("/login");
  };
  const onRoleChange = (e) => {
    setRegisterDetails((prev) => ({ ...prev, role: e.target.value }));
  };
  return (
    <>
      {/* <HeaderComponent></HeaderComponent> */}
      <div style={{ paddingTop: "3rem" }}>
        {" "}
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
                style={{
                  color: "black",
                  fontSize: "larger",
                  fontWeight: "600",
                }}
              >
                Register
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1rem",
                  }}
                >
                  {renderInput("firstName", "text", "First Name")}
                  {renderInput("lastName", "text", "Last Name")}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1rem",
                  }}
                >
                  {renderInput("username", "text", "User Name")}
                  {renderInput("password", "password", "Password")}
                </div>
                <DropdownComponent
                  options={userTypes}
                  placeHolder="Select"
                  label="Role"
                  value={registerDetails.role}
                  onChange={(e) => onRoleChange(e)}
                ></DropdownComponent>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  name="Register"
                  type="submit"
                ></ButtonComponent>
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
      </div>
      {notify && (
        <NotifyComponent
          message={notifyMessage}
          type={notifyType}
          show={notify}
        ></NotifyComponent>
      )}
      {loader && <LoaderComponent></LoaderComponent>}
    </>
  );
};
export default RegisterComponent;
