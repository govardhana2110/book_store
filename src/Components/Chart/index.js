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

const ChartComponent = ({ type, data, labels, height, width, inventryType,yAxis }) => {
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

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 40 + 60); 
      const lightness = Math.floor(Math.random() * 20 + 30);
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(color);
    }
    return colors;
  };
  

  const createChart = (chartType) => {
    const ctx = chartRef.current.getContext("2d");
    if (chartElement) {
      chartElement.destroy();
    }

    const colorCount = Array.isArray(data) ? data.length : 0;
    const backgroundColors = generateColors(colorCount); // Generate unique colors for each bar

    chartElement = new Chart(ctx, {
      type: chartType,
      data: {
        labels: Array.isArray(labels) ? [...labels] : [],
        datasets: [
          {
            label: `${yAxis === 'inventry' ? "Quantity" : yAxis}`,
            data: Array.isArray(data) ? [...data] : [],
            backgroundColor: backgroundColors, // Use different colors for each bar
            borderColor: backgroundColors.map(color => color.replace('0.2', '1')), // Darker shade for borders
            borderWidth: 1,
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
              text: inventryType === 'inventry' ? "Category" :inventryType,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: `${yAxis === 'inventry' ? "Quantity" : yAxis}`,
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
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
