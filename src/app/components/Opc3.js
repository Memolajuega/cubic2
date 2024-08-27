"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc3({respuesta}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  const backgroundColor = isClicked ? '#FC4F4F' : '#4B1572'; 

  return (
    <div className='opc3'
    style={{ backgroundColor }} 
    onClick={handleClick}>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}
