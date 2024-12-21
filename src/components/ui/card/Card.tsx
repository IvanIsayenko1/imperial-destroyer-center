import React from 'react';
import './Card.css';

type CardProps = {
  imageSrc: string;
  name: string;
  properties: { [key: string]: string };
};

export const Card = ({ imageSrc, name, properties }: CardProps) => {
  return (
    <div className="card">
      <div className="image">
        <img src={imageSrc} alt={name} />
      </div>
      <div className="info">
        <h3>{name}</h3>
        {Object.entries(properties).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div>
    </div>
  );
};
