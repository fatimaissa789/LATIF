import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Cards from "./pages/Cards";
import "react-toastify/dist/ReactToastify.css";



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cards" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
