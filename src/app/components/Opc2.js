"use client";

import { useState } from 'react';
import Barra from './Barra'; 

export default function Opc2() {
  const [imageSrc, setImageSrc] = useState('./Opc.png');
  const [showContinue, setShowContinue] = useState(false);
  const [imageIndex, setImageIndex] = useState(1); // Estado para actualizar Barra

  const handleImageClick = () => {
    setImageSrc((prevSrc) => (prevSrc === './Opc.png' ? './Correcta.png' : './Opc.png'));
    setShowContinue(true);
  };

  const handleContinueClick = () => {
    setImageSrc('./Opc.png');
    setShowContinue(false);
    setImageIndex((prevIndex) => {
      if (prevIndex < 3) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  return (
    <div>
      <img 
        src={imageSrc}
        className="opc2"
        alt="Cambiable" 
        onClick={handleImageClick} 
      />
      {showContinue && (
        <img
          src="./continuar.png"
          className="continuar"
          alt="Continuar"
          onClick={handleContinueClick}
          style={{ visibility: 'visible' }} 
        />
      )}
      <Barra imageIndex={imageIndex}/>
    </div>
  );
}
