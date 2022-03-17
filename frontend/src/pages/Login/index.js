import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const user = await localStorage.getItem("@Omni:user_id");
      if (user) navigate("Dashboard");
    }
    getUser();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    const { data } = await api.post("/sessions", { email });
    localStorage.setItem("@Omni:user_id", data._id);
    navigate("Dashboard");
  }

  return (
    <>
      <p>
        Offer <strong>spots</strong> for programmers and find{" "}
        <strong>talented</strong> ones for your company.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="You best e-mail"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </>
  );
}
