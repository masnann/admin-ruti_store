// DashboardTotalCard.jsx
import React from "react";

const DashboardTotalCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
    <p className="text-2xl text-indigo-800 font-bold">{value}</p>
  </div>
);

export default DashboardTotalCard;
