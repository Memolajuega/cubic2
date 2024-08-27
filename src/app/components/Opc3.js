"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc3({ respuesta, isClicked, setIsClicked }) {
  const handleClick = () => {
    setIsClicked(true);
  };

  const backgroundColor = isClicked ? '#FC4F4F' : '#4B1572';
  const sombraBackground = isClicked
    ? 'radial-gradient(ellipse at center, rgba(236, 170, 170, 1) 20%, rgba(236, 170, 170, 0) 100%)'
    : 'radial-gradient(ellipse at center, rgba(156, 81, 183, 1) 20%, rgba(156, 81, 183, 0) 100%)';

  return (
    <div className='opc3'
      style={{ backgroundColor }}
      onClick={handleClick}>
      <div className='sombrita' style={{ background: sombraBackground }}></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}
