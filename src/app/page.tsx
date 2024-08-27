"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "./components/(supabase)/clientClient";
import Opc1 from "./components/Opc1";
import Opc2 from "./components/Opc2";
import Opc3 from "./components/Opc3";
import Indexador from "./components/indexador"; // Renombrado a Indexador para coincidir

export default function Home() {
  const [index, setIndex] = useState(0);
  const [pregunta, setPregunta] = useState('');
  const [respuesta1, setRespuesta1] = useState('');
  const [respuesta2, setRespuesta2] = useState('');
  const [respuesta3, setRespuesta3] = useState('');

  const supabase = createClient();

  // Total de preguntas, puedes cambiar este valor si cambian las preguntas
  const totalPreguntas = 5;

  const fetchPreguntas = async () => {
    const { data: preguntas } = await supabase.from("preguntas").select("*");
    
    if (preguntas && preguntas.length > index) {
      setPregunta(preguntas[index].Pregunta);
      setRespuesta1(preguntas[index].Rta1);
      setRespuesta2(preguntas[index].Rta2);
      setRespuesta3(preguntas[index].Rta3);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, [index]);

  const handleIncrementIndex = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, totalPreguntas - 1)); // Evitar que el índice sea mayor que el total de preguntas
  };

  const handleDecrementIndex = () => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1)); // Evitar que el índice sea negativo
  };

  // Calcular el ancho de la barra de progreso
  const progresoAncho = ((index) / totalPreguntas) * 100 + '%';

  return (
    <div>
      <div className="cuerpo">
        <div className="sidemenu">
          <h1>CUBIC</h1>
          <a href="">Aprender</a>
          <a href="">Perfil</a>
          <a href="">Desafíos</a>
        </div>
        <div className="top">
          <img src="/flecha1.png" alt="Flecha" className="flecha" />
          <div className="barrafija">
            <div className="progreso" style={{ width: progresoAncho }}></div>
          </div>
          <div className="estrellas"></div>
        </div>
        <div className="nivel">
          <div className="pregunta">{pregunta}</div>
          <Opc1 respuesta={respuesta1} />
          <Opc2 respuesta={respuesta2} />  
          <Opc3 respuesta={respuesta3}/>
        </div>
        <Indexador 
          onIncrement={handleIncrementIndex} 
          onDecrement={handleDecrementIndex} 
          index={index} 
        />
      </div>
    </div>
  );
}
