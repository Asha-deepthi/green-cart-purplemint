import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";

function PrivateRoute({children}) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />
}

function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login onLogin={()=>window.location='/'} />} />
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/simulate" element={<PrivateRoute><Simulation/></PrivateRoute>} />
      {/* add drivers/routes/orders pages */}
    </Routes>
  </BrowserRouter>
}
export default App;
