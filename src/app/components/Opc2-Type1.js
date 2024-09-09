"use client";

import { useState } from 'react';
import '../../app/globals.css'; 

export default function Opc2Type1({ respuesta, isClicked, setIsClicked }) {
  const handleClick = () => {
    setIsClicked(true);
  };

  const backgroundColor = isClicked ? '#4B9C61' : '#4B1572';
  const sombraBackground = isClicked
  ? 'radial-gradient(ellipse at center, rgba(152, 206, 167, 1) 20%, rgba(152, 206, 167, 0) 100%)'
  : 'radial-gradient(ellipse at center, rgba(156, 81, 183, 1) 20%, rgba(156, 81, 183, 0) 100%)';

  return (
    <div
      className='opc2-type1' 
      style={{ backgroundColor }} 
      onClick={handleClick}
    >
      <div className='rta-type2'>{respuesta}</div>
    </div>
  );
}
