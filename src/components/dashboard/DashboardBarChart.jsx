// DashboardBarChart.jsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DashboardBarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = data.map((week) => week.week);
    const chartData = data.map((week) => week.total);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Orders Per Week",
            data: chartData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Orders Per Week
      </h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DashboardBarChart;
