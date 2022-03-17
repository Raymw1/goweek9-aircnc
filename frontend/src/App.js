import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import Routes from "./routes";
import logo from "./assets/logo.svg";

export default function App() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC" onClick={handleLogout} />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}
