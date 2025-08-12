import React from "react";
import { Bar } from "react-chartjs-2";

export default function FuelBreakdownChart({ orders }) {
  // sum fuel by driver or by route (we only have per-order fuel cost)
  const byDriver = {};
  orders.forEach(o => {
    if(o.status === "unassigned") return;
    const d = o.assigned_driver || "Others";
    byDriver[d] = (byDriver[d] || 0) + (o.fuel_cost || 0);
  });

  const labels = Object.keys(byDriver);

  // Define a color palette
  const colors = [
    "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50",
    "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#f44336"
  ];

  const data = {
    labels,
    datasets: [{
      label: "Fuel cost ₹",
      data: labels.map(l => byDriver[l]),
      backgroundColor: labels.map((_, i) => colors[i % colors.length]),
      borderColor: labels.map((_, i) => colors[i % colors.length]),
      borderWidth: 1,
    }]
  };

  return <div style={{width:600}}><Bar data={data} /></div>;
}

