"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc2({respuesta}) {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); 
  };

  const backgroundColor = isClicked ? '#4B9C61' : '#4B1572'; 

  return (
    <div className='opc2'
    style={{ backgroundColor }} 
    onClick={handleClick}>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}
