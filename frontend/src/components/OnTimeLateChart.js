import React from "react";
import { Pie } from "react-chartjs-2";

export default function OnTimeLateChart({ onTime, late }) {
  const data = { labels: ["On time", "Late"], datasets: [{ data: [onTime, late] }] };
  return <div style={{width:300}}><Pie data={data} /></div>;
}
