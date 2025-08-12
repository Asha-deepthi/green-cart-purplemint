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
      await api.post("/simulations/", {
        available_drivers: availableDrivers,
        route_start_time: routeStartTime,
        max_hours_per_driver: maxHours,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={runSim}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Run Simulation</h2>

        <div>
          <label className="block mb-1 font-medium">Available Drivers</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={availableDrivers}
            onChange={(e) => setAvailableDrivers(Number(e.target.value))}
            min={1}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Route Start Time (HH:MM)</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={routeStartTime}
            onChange={(e) => setRouteStartTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Max Hours per Driver</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={maxHours}
            onChange={(e) => setMaxHours(Number(e.target.value))}
            min={1}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Run Simulation
        </button>

        {error && (
          <div className="text-center text-red-600 font-medium">{JSON.stringify(error)}</div>
        )}
      </form>
    </div>
  );
}
