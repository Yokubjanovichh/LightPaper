import React from "react";
import "./charging.css";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const Charging = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div className="page animate__animated animate__fadeIn">
      <div className="page__header">
        <h1>Раздел в разработке</h1>
        <button onClick={back}>
          <IoArrowBack />
        </button>
      </div>

      <figure className="charging__image">
        <img src="images/charging.svg" alt="charging" loading="lazy" />
        <figcaption>
          <p>
            Здесь вы сможете зарядить свой электромобиль. Пока что для зарядки
            воспользуйтесь <span>приложением Portal Energy</span>.
          </p>
          <img src="images/portal_enargy.svg" alt="portal_enargy" />
        </figcaption>
      </figure>
    </div>
  );
};
