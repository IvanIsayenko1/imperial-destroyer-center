import React from "react";
import "./Title.css";

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return <h1 className="text-2xl font-bold">{title}</h1>;
};
