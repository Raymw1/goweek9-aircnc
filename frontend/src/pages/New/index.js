import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import camera from "../../assets/camera.svg";
import "./styles.css";

export default function New() {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [user_id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const id = await localStorage.getItem("@Omni:user_id");
      if (!id) navigate("/");
      setUserId(id);
    }
    getUser();
  }, [navigate, user_id]);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company", company);
    formData.append("techs", techs);
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    await api.post("/spots", formData, {
      headers: { user_id },
    });
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "filled" : ""}
      >
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">COMPANY *</label>
      <input
        type="text"
        id="company"
        name="company"
        placeholder="Your awesome company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <label htmlFor="techs">
        TECHS * <span>(use comma to separate)</span>
      </label>
      <input
        type="text"
        id="techs"
        name="techs"
        placeholder="What techs do you use?"
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
      />
      <label htmlFor="price">
        DAILY PRICE * <span>(empty for FREE)</span>
      </label>
      <input
        type="text"
        id="price"
        name="price"
        placeholder="Daily price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="button">
        New
      </button>
    </form>
  );
}
