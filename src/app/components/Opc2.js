"use client";

import { useState } from 'react';
import '../../app/globals.css';

export default function Opc2({respuesta}) {

  return (
    <div className='opc2'>
      <div className='sombrita'></div>
      <div className='rta'>{respuesta}</div>
    </div>
  );
}
