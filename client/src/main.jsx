import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Register from "./components/Register";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavBar from "./components/NavBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
