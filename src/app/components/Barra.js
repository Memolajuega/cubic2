import React, { useEffect } from 'react';

export default function Barra({ imageIndex }) {
  const getImageSrc = (index) => {
    return `./barra${index}.png`;
  };

  return (
    <img
      src={getImageSrc(imageIndex)}
      alt="Barra"
      className="barra"
    />
  );
}
