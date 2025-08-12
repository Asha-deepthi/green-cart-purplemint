import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import Simulation from "./pages/Simulation.js";

// Protect private routes — redirect to / (login) if no token
function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page at root "/" */}
        <Route path="/" element={<Login onLogin={() => window.location.href = "/simulate"} />} />

        {/* Dashboard and Simulation pages - require auth */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/simulate"
          element={
            <PrivateRoute>
              <Simulation />
            </PrivateRoute>
          }
        />

        {/* Catch-all: redirect based on auth */}
        <Route
          path="*"
          element={
            localStorage.getItem("access_token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
