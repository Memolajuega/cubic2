"use client";

import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Indexador({ onIncrement, onDecrement, index }) {
  return (
    <div className="footer">
      {index >= 1 && (
        <div className="anterior">
          <h2 onClick={onDecrement}>Anterior</h2>
        </div>
      )}
      <div className="continuar">
        <h2 onClick={onIncrement}>Continuar</h2>
      </div>
      <div className="estrellas">
        <h1>{index}</h1> {/* Muestra el índice aquí */}
        <img src="/star.png" alt="Estrellas" className="star" />
      </div>
    </div>
  );
}

// Definir PropTypes para el componente
Indexador.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
