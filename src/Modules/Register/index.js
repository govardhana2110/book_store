import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/Input";
import "./register.css";
import DropdownComponent from "../../Components/Dropdown";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Components/Button";
import HeaderComponent from "../../Components/Header";
import loginService from "../../Lib/Services/Login";
import registerService from "../../Lib/Services/Register";

const RegisterComponent = () => {
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    phone: "",
    userName: "",
    password: "",
    role: null,
    firstName: "",
    lastName: "",
  });
  const userTypes = [
    { name: "Admin", value: "admin" },
    { name: "User", value: "user" },
  ];
  const [usersList, setUsersList] = useState(0);
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
  const renderInput = (name, type) => {
    return (
      <InputComponent
        value={registerDetails[name]}
        required={true}
        placeholder={name}
        onChange={(e) => handleChange(e.target.value, name)}
        type={type}
        label={name}
      ></InputComponent>
    );
  };
  const handleChange = (value, name) => {
    setRegisterDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerClick = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        ...registerDetails,
        id: usersList + 1,
      };
      const response = await registerService(obj);
      console.log(response);
    } catch (err) {
      console.log(err);
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
      <HeaderComponent></HeaderComponent>
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
                  {renderInput("firstName", "text")}
                  {renderInput("lastName", "text")}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {renderInput("email", "text")}
                  {renderInput("phone", "number")}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1rem",
                  }}
                >
                  {renderInput("userName", "text")}
                  {renderInput("password", "password")}
                </div>
                <DropdownComponent
                  options={userTypes}
                  placeHolder="Select"
                  label="Role"
                  value={registerDetails.role}
                  onChange={(e) => onRoleChange(e)}
                ></DropdownComponent>
              </div>

              <div>
                <ButtonComponent name="Register" type='submit'></ButtonComponent>
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
    </>
  );
};
export default RegisterComponent;
