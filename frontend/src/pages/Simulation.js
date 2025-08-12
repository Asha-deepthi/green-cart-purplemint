import React, {useState} from "react";
import api from "../api/api";

export default function Simulation() {
  const [availableDrivers, setAvailableDrivers] = useState(5);
  const [routeStartTime, setRouteStartTime] = useState("08:00");
  const [maxHours, setMaxHours] = useState(8);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function runSim(e){
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/simulations/run/", { available_drivers: availableDrivers, route_start_time: routeStartTime, max_hours_per_driver: maxHours });
      setResult(res.data);
    } catch(err){
      setError(err.response?.data || "Error");
    }
  }
  return (<div>
    <h2>Run Simulation</h2>
    <form onSubmit={runSim}>
      <label>Available Drivers</label>
      <input type="number" value={availableDrivers} onChange={e=>setAvailableDrivers(Number(e.target.value))} />
      <label>Route Start Time (HH:MM)</label>
      <input value={routeStartTime} onChange={e=>setRouteStartTime(e.target.value)} />
      <label>Max Hours per Driver</label>
      <input type="number" value={maxHours} onChange={e=>setMaxHours(Number(e.target.value))} />
      <button type="submit">Run Simulation</button>
    </form>
    {error && <div style={{color:'red'}}>Error: {JSON.stringify(error)}</div>}
    {result && <div>
      <h3>Simulation Results</h3>
      <div>Total Profit: ₹{result.results.total_profit}</div>
      <div>Efficiency: {result.results.efficiency_score}%</div>
      <div>On Time: {result.results.on_time_deliveries}</div>
      <div>Late: {result.results.late_deliveries}</div>
      {/* Show more or render charts */}
    </div>}
  </div>);
}
