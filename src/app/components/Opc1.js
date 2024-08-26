"use client";

import { useState } from 'react';
import '../../app/globals.css';
export default function Opc1({ respuesta }) {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); 
  };

  const backgroundColor = isClicked ? '#FC4F4F' : '#4B1572';

  return (
    <div className='opc1' 
    style={{ backgroundColor }} 
    onClick={handleClick}>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}