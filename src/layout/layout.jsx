import React, { memo } from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

export const Layout = memo(() => {
  return (
    <main className="layout">
      <section className="layout__content">
        <Outlet />
      </section>
    </main>
  );
});
