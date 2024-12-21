import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import "./Layout.css";
import { Footer } from "../footer/Footer";

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
