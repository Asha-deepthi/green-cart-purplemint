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
  const data = { labels, datasets: [{ label: "Fuel cost ₹", data: labels.map(l=>byDriver[l]) }] };
  return <div style={{width:600}}><Bar data={data} /></div>;
}
