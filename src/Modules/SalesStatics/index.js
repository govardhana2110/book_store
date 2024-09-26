import React, { useState } from "react";
import HeaderComponent from "../../Components/Header";
import ChartComponent from "../../Components/Chart";
import "./salesStatistics.css";

const SalesStaticsComponent = () => {
  const dataLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = [653453, 5956567, 3067878, 818978, 5678978, 555644, 4056567];
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ paddingTop: "5rem" }}>
        <label style={{ color: "black" }}>Sales Statics</label>{" "}
        <div className="mainCardDiv">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {" "}
                <ChartComponent
                  type="line"
                  labels={dataLabels}
                  data={data}
                  height={200}
                  width={300}
                ></ChartComponent>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {" "}
                <ChartComponent
                  type="pie"
                  labels={dataLabels}
                  data={data}
                  height={300}
                  width={300}
                ></ChartComponent>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {" "}
                <ChartComponent
                  type="bar"
                  labels={dataLabels}
                  data={data}
                  height={200}
                  width={300}
                ></ChartComponent>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <ChartComponent
                  type="doughnut"
                  labels={dataLabels}
                  data={data}
                  height={300}
                  width={300}
                ></ChartComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SalesStaticsComponent;
