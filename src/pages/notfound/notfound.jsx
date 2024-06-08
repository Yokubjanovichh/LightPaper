import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="notfound animate__animated animate__fadeIn">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Возможно, страница была удалена или в режиме разработки</p>
      <Link to="/">На главную</Link>
    </div>
  );
};
