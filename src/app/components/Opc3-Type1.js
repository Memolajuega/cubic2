"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc3Type1({ respuesta }) {

  return (
    <div className='opc3-type1'>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}