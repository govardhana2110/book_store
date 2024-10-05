import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import ChartComponent from "../../Components/Chart";
import "./salesStatistics.css"; // Import the CSS file
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";

const SalesStaticsComponent = () => {
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
          if (item.category) {
            labelData[item.category] = (labelData[item.category] || 0) + item.availableQuantity;
          }
        });
        setInventryLabels(Object.keys(labelData));
        setInventryData(Object.values(labelData));
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
          if (item.category) {
            labelData[item.category] = (labelData[item.category] || 0) + item.quantity;
          }
        });
        setOrderLabels(Object.keys(labelData));
        setOrderData(Object.values(labelData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div style={{ paddingTop: "5rem" }}>
        <div className="mainCardDiv">
          <label>Inventory Levels</label>
          <div className="chart-container">
            <div className="chart-wrapper">
              <ChartComponent
                type="line"
                labels={inventryLabels}
                data={inventryData}
                height={200}
                width={300}
                inventryType="Inventory"
              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="pie"
                labels={inventryLabels}
                data={inventryData}
                height={300}
                width={300}
                inventryType="Inventory"
              />
            </div>
          </div>
          <label>Sales Statistics</label>
          <div className="chart-container">
            <div className="chart-wrapper">
              <ChartComponent
                type="bar"
                labels={orderLabels}
                data={orderData}
                height={200}
                width={300}
                inventryType="Sales"
              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="doughnut"
                labels={orderLabels}
                data={orderData}
                height={300}
                width={300}
                inventryType="Sales"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesStaticsComponent;
