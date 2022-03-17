import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSpots() {
      const user_id = await localStorage.getItem("@Omni:user_id");
      if (!user_id) navigate("/");
      const { data } = await api.get("/dashboard", { headers: { user_id } });
      setSpots(data);
    }
    loadSpots();
  }, [navigate]);

  return (
    <>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/day` : "FREE "}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="button">New spot</button>
      </Link>
    </>
  );
}
