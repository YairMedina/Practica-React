import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowProducts from "./components/ShowProducts";
import Vehicles from "./components/Vehicles";
import Clients from "./components/Clients";
import Models from "./components/Models";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShowProducts />} />
          <Route path="/model" element={<Models />} />
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/client" element={<Clients />} />
            <Route path="/vehicle" element={<Vehicles />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


