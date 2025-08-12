import React, {useEffect, useState} from "react";
import api from "../api/api";
import OnTimeLateChart from "../components/OnTimeLateChart";
import FuelBreakdownChart from "../components/FuelBreakdownChart";

export default function Dashboard() {
  const [sim, setSim] = useState(null);
  useEffect(()=>{
    api.get("/simulations/")  // list
      .then(r => {
        const items = r.data;
        if (items.length > 0) setSim(items[items.length-1]); // latest
      }).catch(console.error);
  },[]);

  if (!sim) return <div>No simulation yet — run one in Simulation page.</div>;

  const { results } = sim;
  return (
    <div>
      <h1>Dashboard</h1>
      <div>Total Profit: ₹{results.total_profit}</div>
      <div>Efficiency Score: {results.efficiency_score}%</div>
      <OnTimeLateChart onTime={results.on_time_deliveries} late={results.late_deliveries} />
      <div>Fuel total: ₹{results.fuel_cost_total}</div>
      <FuelBreakdownChart orders={results.orders} />
      {/* Add tables as needed */}
    </div>
  );
}
