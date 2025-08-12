import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import api from "../api/api";
import OnTimeLateChart from "../components/OnTimeLateChart";
import FuelBreakdownChart from "../components/FuelBreakdownChart";

export default function Dashboard() {
  const [sim, setSim] = useState(null);
  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    api.get("/simulations/")
      .then(r => {
        const items = r.data;
        if (items.length > 0) setSim(items[items.length - 1]);
      })
      .catch(console.error);
  }, []);

  if (!sim)
    return (
      <div className="text-center mt-20 text-gray-700 text-lg">
        No simulation yet — run one in Simulation page.
      </div>
    );

  const { results } = sim;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow space-y-2">
          <div className="text-xl font-medium">Total Profit:</div>
          <div className="text-2xl text-green-600">₹{results.total_profit}</div>
        </div>

        <div className="bg-white p-6 rounded shadow space-y-2">
          <div className="text-xl font-medium">Efficiency Score:</div>
          <div className="text-2xl text-blue-600">{results.efficiency_score}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <OnTimeLateChart
          onTime={results.on_time_deliveries}
          late={results.late_deliveries}
        />

        <div>
          <div className="text-xl font-medium mb-3">Fuel total:</div>
          <div className="text-2xl text-yellow-600 mb-6">₹{results.fuel_cost_total}</div>
          <FuelBreakdownChart orders={results.orders} />
        </div>
      </div>

      {/* New button to run another simulation */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/simulate")}
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Run Another Simulation
        </button>
      </div>
    </div>
  );
}
