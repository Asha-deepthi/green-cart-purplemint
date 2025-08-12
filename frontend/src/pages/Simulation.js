import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Simulation() {
  const [availableDrivers, setAvailableDrivers] = useState(5);
  const [routeStartTime, setRouteStartTime] = useState("08:00");
  const [maxHours, setMaxHours] = useState(8);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function runSim(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/simulations/", {
        available_drivers: availableDrivers,
        route_start_time: routeStartTime,
        max_hours_per_driver: maxHours,
      });
      // Optionally save result somewhere if needed
      // Redirect to dashboard after successful simulation
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Error");
    }
  }

  return (
    <div>
      <h2>Run Simulation</h2>
      <form onSubmit={runSim}>
        <label>Available Drivers</label>
        <input
          type="number"
          value={availableDrivers}
          onChange={(e) => setAvailableDrivers(Number(e.target.value))}
        />
        <label>Route Start Time (HH:MM)</label>
        <input
          value={routeStartTime}
          onChange={(e) => setRouteStartTime(e.target.value)}
        />
        <label>Max Hours per Driver</label>
        <input
          type="number"
          value={maxHours}
          onChange={(e) => setMaxHours(Number(e.target.value))}
        />
        <button type="submit">Run Simulation</button>
      </form>
      {error && <div style={{ color: "red" }}>Error: {JSON.stringify(error)}</div>}
    </div>
  );
}
