import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header";
import ChartComponent from "../../Components/Chart";
import "./salesStatistics.css"; // Import the CSS file
import getAllBooksService from "../../Lib/Services/GetAllBooks";
import getOrderHistoryService from "../../Lib/Services/OrderHistory";

const SalesStaticsComponent = () => {
  const [inventryLabels, setInventryLabels] = useState([]);
  const [inventryData, setInventryData] = useState([]);
  const [orderDailyData, setOrderDailyData] = useState({});
  const [orderMonthlyData, setOrderMonthlyData] = useState({});
  const [orderYearlyData, setOrderYearlyData] = useState({});
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
            labelData[item.category] =
              (labelData[item.category] || 0) + item.availableQuantity;
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
        let labelDailyData = {};
        let labelMonthlyData = {};
        let labelYearlyData = {};

        response.data.forEach((item) => {
          if (item.orderedDate) {
            // Daily Data
            const orderedDate = new Date(item.orderedDate)
              .toISOString()
              .split("T")[0]; // Format to YYYY-MM-DD
            labelDailyData[orderedDate] =
              (labelDailyData[orderedDate] || 0) + (item.quantity * item.price);

            // Monthly Data
            const month = new Date(item.orderedDate).getMonth() + 1; // Months are zero-based
            const year = new Date(item.orderedDate).getFullYear();
            const monthYearKey = `${year}-${month < 10 ? "0" : ""}${month}`; // Format as YYYY-MM
            labelMonthlyData[monthYearKey] =
              (labelMonthlyData[monthYearKey] || 0) +  (item.quantity * item.price);

            // Yearly Data
            labelYearlyData[year] =
              (labelYearlyData[year] || 0) +  (item.quantity * item.price);
          }
        });

        setOrderDailyData(labelDailyData);
        setOrderMonthlyData(labelMonthlyData);
        setOrderYearlyData(labelYearlyData);
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
                 inventryType="inventry"
                yAxis='inventry'
              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="pie"
                labels={inventryLabels}
                data={inventryData}
                height={300}
                width={300}
                inventryType="inventry"
                yAxis='inventry'
              />
            </div>
          </div>
          <label>Daily Sales Statistics</label>
          <div className="chart-container">
            <div className="chart-wrapper">
              <ChartComponent
                type="bar"
                labels={Object.keys(orderDailyData)}
                data={Object.values(orderDailyData)}
                height={200}
                width={300}
                inventryType="Daily"
                yAxis='Revenue'
              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="doughnut"
                labels={Object.keys(orderDailyData)}
                data={Object.values(orderDailyData)}
                height={300}
                width={300}
               inventryType="Daily"
                yAxis='Revenue'
              />
            </div>
          </div>
          <label>Monthly Sales Statistics</label>
          <div className="chart-container">
            <div className="chart-wrapper">
              <ChartComponent
                type="bar"
                labels={Object.keys(orderMonthlyData)}
                data={Object.values(orderMonthlyData)}
                height={200}
                width={300}
                inventryType="Monthly"
                yAxis='Revenue'

              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="doughnut"
                labels={Object.keys(orderMonthlyData)}
                data={Object.values(orderMonthlyData)}
                height={300}
                width={300}
                inventryType="Monthly"
                yAxis='Revenue'
              />
            </div>
          </div>
          <label>Yearly Sales Statistics</label>
          <div className="chart-container">
            <div className="chart-wrapper">
              <ChartComponent
                type="bar"
                labels={Object.keys(orderYearlyData)}
                data={Object.values(orderYearlyData)}
                height={200}
                width={300}
                inventryType="Yearly"
                yAxis='Revenue'
              />
            </div>
            <div className="chart-wrapper">
              <ChartComponent
                type="doughnut"
                labels={Object.keys(orderYearlyData)}
                data={Object.values(orderYearlyData)}
                height={300}
                width={300}
               inventryType="Yearly"
                yAxis='Revenue'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesStaticsComponent;
