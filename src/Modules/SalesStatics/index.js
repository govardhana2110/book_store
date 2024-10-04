import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import ChartComponent from "../../Components/Chart";
import "./salesStatistics.css";
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";

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
  const [inventryLabels, setInventryLabels] = useState([]);
  const [inventryData, setInventryData] = useState([]);
  const [orderLabels, setOrderLabels] = useState([]);
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    getAllBooks();
    getAllOrders();
  }, []);

  const getAllBooks = async () => {
    try {
      const response = await getAllBooksService();
      if (response.status === 200) {
        let labelData = {};
        response.data.map((item) => {
          Object.keys(item).map((key) => {
            if (key === "category") {
              labelData[item[key]] =
                labelData[key] || 0 + item["availableQuantity"];
            }
          });
        });
        setInventryLabels(Object.keys(labelData));
        setInventryData(Object.values(labelData));
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllOrders = async () => {
    try {
      const response = await getOrderHistoryService();
      if (response.status === 200) {
        let labelData = {};
        response.data.map((item) => {
          Object.keys(item).map((key) => {
            if (key === "category") {
              labelData[item[key]] =
                labelData[item[key]] || 0 + item["quantity"];
            }
          });
        });
        setOrderLabels(Object.keys(labelData));
        setOrderData(Object.values(labelData));
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const data = [653453, 5956567, 3067878, 818978, 5678978, 555644, 4056567];
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div style={{ paddingTop: "5rem" }}>
       
        <div className="mainCardDiv">
          {" "}
          <label style={{ color: "black" }}>Inventry Levels</label>{" "}
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
                  labels={inventryLabels}
                  data={inventryData}
                  height={200}
                  width={300}
                  inventryType="Inventry"
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
                  labels={inventryLabels}
                  data={inventryData}
                  height={300}
                  width={300}
                  inventryType="Inventry"
                ></ChartComponent>
              </div>
            </div>
            <label style={{ color: "black" }}>Sales Statics</label>{" "}
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
                  labels={orderLabels}
                  data={orderData}
                  height={200}
                  width={300}
                  inventryType="sales"
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
                  labels={orderLabels}
                  data={orderData}
                  height={300}
                  width={300}
                  inventryType="sales"
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
