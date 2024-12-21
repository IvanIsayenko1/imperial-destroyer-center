import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items?: NavigationItem[];
}

export const Navigation: React.FC<NavigationProps> = ({
  items = [
    { label: "Planets", href: "/planets" },
    { label: "Starships", href: "/starships" },
    { label: "Vehicles", href: "/vehicles" },
  ],
}) => {
  return (
    <nav>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
