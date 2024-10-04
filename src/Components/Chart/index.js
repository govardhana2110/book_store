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

const ChartComponent = ({ type, data, labels, height, width ,inventryType}) => {
  Chart.register(
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    BarController,
    BarElement,
    PieController,
    ArcElement,
    Tooltip,
    Legend
  );

  const chartRef = useRef(null);
  let chartElement;

  const createChart = (chartType) => {
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }

    chartElement = new Chart(ctx, {
      type: chartType,
      data: {
        labels: Array.isArray(labels) ? [...labels] : [],
        datasets: [
          {
            label: `${inventryType==='sales'?"Sales":'Quantity'}`,
            data: Array.isArray(data) ? [...data] : [],
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Add background color for visibility
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true, // Fill area under the line for line charts
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Categories",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: `${inventryType==='sales'?"Sales":'Quantity'}`,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true, // Enable tooltips for showing values on hover
          },
          legend: {
            display: true, // Display legend
          },
        },
      },
    });
  };

  useEffect(() => {
    if (Array.isArray(data) && Array.isArray(labels) && data.length && labels.length) {
      createChart(type);
    }
    return () => {
      if (chartElement) chartElement.destroy();
    };
  }, [type, data, labels]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} height={height} width={width}></canvas>
    </div>
  );
};

export default ChartComponent;
