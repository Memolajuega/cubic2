"use client";

import { useState } from 'react';

export default function Opc3() {
  const [imageSrc, setImageSrc] = useState('./Opc.png');

  const handleImageClick = () => {
    setImageSrc((prevSrc) => (prevSrc === './Opc.png' ? './Incorrecta.png' : './Opc.png'));
  };

  return (
    <div>
      <img 
        src={imageSrc}
        className = "opc3"
        onClick={handleImageClick} 
      />
    </div>
  );
}
