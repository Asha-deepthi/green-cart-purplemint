import React from "react";
import { Pie } from "react-chartjs-2";

export default function OnTimeLateChart({ onTime, late }) {
  const data = {
    labels: ["On time", "Late"],
    datasets: [{
      data: [onTime, late],
      backgroundColor: ["#4caf50", "#f44336"],  // green and red
      borderColor: ["#388e3c", "#d32f2f"],
      borderWidth: 1,
    }]
  };

  return <div style={{width:300}}><Pie data={data} /></div>;
}
