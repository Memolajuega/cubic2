"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc1Type1({ respuesta }) {
    
  return (
    <div className='opc1-type1'>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}