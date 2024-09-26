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

const ChartComponent = ({ type, data, labels, height, width }) => {
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

  const chartRef = useRef(null);

  let chartElement;

  const lineChart = () => {
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }
    chartElement = new Chart(ctx, {
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
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }
    chartElement = new Chart(ctx, {
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
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }
    chartElement = new Chart(ctx, {
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
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }
    chartElement = new Chart(ctx, {
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
      if (chartElement) chartElement.destroy();
    };
  }, [type]);
  return (
    <div className="chart-container">
      <canvas ref={chartRef} height={height} width={width}></canvas>
    </div>
  );
};

export default ChartComponent;
