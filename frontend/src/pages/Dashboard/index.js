import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import socketio from "socket.io-client";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const user_id = localStorage.getItem("@Omni:user_id");
  const socket = useMemo(
    () => socketio("http://localhost:3333", { query: { user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", (data) => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

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
      <ul className="notifications">
        {requests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> is requesting a booking at{" "}
              <strong>{request.spot.company}</strong> at: {request.date}
            </p>
            <button>ACCEPT</button>
            <button>REJECT</button>
          </li>
        ))}
      </ul>
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
