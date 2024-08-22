"use client";

import { useState } from 'react';
import '../../app/globals.css'; 
export default function Opc2Type1({ respuesta }) {
  
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); 
  };

  const backgroundColor = isClicked ? '#4B9C61' : '#4B1572'; 

  return (
    <div
      className='opc2-type1' 
      style={{ backgroundColor }} 
      onClick={handleClick}
    >
      <div className='rta-type1'>{respuesta}</div>
    </div>
  );
}
