"use client";

import PropTypes from 'prop-types';

export default function Indexador({ onIncrement, onDecrement, index, showContinuar }) {
  return (
    <div className="footer">
      {index >= 1 && (
        <div className="anterior">
          <h2 onClick={onDecrement}>Anterior</h2>
        </div>
      )}
      {showContinuar && (
        <div className="continuar">
          <h2 onClick={onIncrement}>Continuar</h2>
        </div>
      )}
      <div className="estrellas">
        <h1>{index}</h1>
        <img src="/star.png" alt="Estrellas" className="star" />
      </div>
    </div>
  );
}

Indexador.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  showContinuar: PropTypes.bool.isRequired,
};
