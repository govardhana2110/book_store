import React, { useEffect, useRef } from "react";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";

const ChartComponent = ({ type, data, labels,height,width }) => {
  Chart.register(
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    PieController,
    ArcElement,
    Tooltip,
    Legend
  );

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  let myLineChart;
  let myBarChart;
  let myPieChart;
  let myDoughnutChart;

  const lineChart = () => {
    const ctx = lineChartRef.current.getContext("2d");
    if (myLineChart) {
      myLineChart.destroy();
    }
    myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...labels],
        datasets: [
          {
            label: "Sales",
            data: [...data],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  const barChart = () => {
    const ctx = lineChartRef.current.getContext("2d");
    if (myLineChart) {
      myLineChart.destroy();
    }
    myLineChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [...labels],
        datasets: [
          {
            label: "Sales",
            data: [...data],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  const pieChart = () => {
    const ctx = lineChartRef.current.getContext("2d");
    if (myLineChart) {
      myLineChart.destroy();
    }
    myLineChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [...labels],
        datasets: [
          {
            label: "Sales",
            data: [...data],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  const doughnutChart = () => {
    const ctx = lineChartRef.current.getContext("2d");
    if (myLineChart) {
      myLineChart.destroy();
    }
    myLineChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [...labels],
        datasets: [
          {
            label: "Sales",
            data: [...data],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    switch (type) {
      case "bar":
        barChart();
        break;
      case "pie":
        pieChart();
        break;
      case "doughnut":
        doughnutChart();
        break;
      default:
        lineChart();
    }
    return () => {
      if (myLineChart) myLineChart.destroy();
      if (myBarChart) myBarChart.destroy();
      if (myPieChart) myPieChart.destroy();
      if (myDoughnutChart) myDoughnutChart.destroy();
    };
  }, [type]);
  return (
    <div className="chart-container">
      <canvas ref={lineChartRef} height={height} width={width}></canvas>
      <canvas ref={barChartRef}></canvas>
      <canvas ref={pieChartRef}></canvas>
      <canvas ref={doughnutChartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
