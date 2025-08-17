import React from "react";

const StatCard = ({ title, value }) => (
  <div className="card bg-base-100 shadow-lg p-4">
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-semibold">{value}</p>
  </div>
);

export default StatCard;
