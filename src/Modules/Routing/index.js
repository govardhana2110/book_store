import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginComponent from "../Login";
import RegisterComponent from "../Register";
import NotFoundModule from "../NotFound";
import PrivateRoute from "./PrivateRoute";
import HomeComponent from "../Home";
import ManageInventryComponent from "../ManageInventry";
import CheckOutComponent from "../CheckOut";
import OrderHistoryComponent from "../OrderHistory";

const RoutingModule = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeComponent></HomeComponent>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/manageInventry"
          element={
            <PrivateRoute>
              <ManageInventryComponent></ManageInventryComponent>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/checkOut"
          element={
            <PrivateRoute>
              <CheckOutComponent></CheckOutComponent>
            </PrivateRoute>
          }
        ></Route>
         <Route
          path="/orderHistory"
          element={
            <PrivateRoute>
              <OrderHistoryComponent></OrderHistoryComponent>
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFoundModule />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutingModule;
