"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "../components/(supabase)/clientClient";
import Opc1 from "../components/Opc1";
import Opc2 from "../components/Opc2";
import Opc3 from "../components/Opc3";
import Indexador from "../components/indexador";
import Link from 'next/link';

export default function Home() {
  const [index, setIndex] = useState(0);
  const [pregunta, setPregunta] = useState('');
  const [respuesta1, setRespuesta1] = useState('');
  const [respuesta2, setRespuesta2] = useState('');
  const [respuesta3, setRespuesta3] = useState('');
  const [opc1Clicked, setOpc1Clicked] = useState(false);
  const [opc2Clicked, setOpc2Clicked] = useState(false);
  const [opc3Clicked, setOpc3Clicked] = useState(false);

  const supabase = createClient();
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
    setOpc1Clicked(false); 
    setOpc2Clicked(false); 
    setOpc3Clicked(false);
  }, [index]);

  const handleIncrementIndex = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, totalPreguntas));
  };

  const handleDecrementIndex = () => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const progresoAncho = ((index) / totalPreguntas) * 100 + '%';

  const handleOpc1Click = () => {
    setOpc1Clicked(true);
  };

  const handleOpc2Click = () => {
    setOpc2Clicked(true);
  };

  const handleOpc3Click = () => {
    setOpc3Clicked(true);
  };

  const handleContinuarClick = () => {
    handleIncrementIndex();
    setOpc1Clicked(false); 
    setOpc2Clicked(false); 
    setOpc3Clicked(false);
  };

  return (
    <div>
      <div className="cuerpo">
        <div className="sidemenu">
          <h1>CUBIC</h1>
          <div>
            <img src="/brain.png" alt="" />
            <a href="">Aprender</a></div>
          <div>
            <img src="/user.png" alt="" />
            <a href="">Perfil</a></div>
          <div>
            <img src="/target.png" alt="" />
            <a href="">Desafíos</a></div>
        </div>
        <div className="top">
          <Link href="/">
            <img src="/flecha1.png" alt="Flecha" className="flecha" />
          </Link>
          <div className="barrafija">
            <div className="progreso" style={{ width: progresoAncho }}></div>
          </div>
        </div>

        {index < totalPreguntas ? (
          <div className="nivel">
            <div className="pregunta">{pregunta}</div>
            <Opc1 respuesta={respuesta1} isClicked={opc1Clicked} setIsClicked={setOpc1Clicked} />
            <Opc2 respuesta={respuesta2} isClicked={opc2Clicked} setIsClicked={setOpc2Clicked} />
            <Opc3 respuesta={respuesta3} isClicked={opc3Clicked} setIsClicked={setOpc3Clicked} />
          </div>
        ) : (
          <div className="victoria">
            <div className="cuadro">
              <h1>¡Felicitaciones, ganaste!</h1>
              <h2>Sumaste {index} estrellas</h2>
              <img src="/star.png" alt="estrella" className="star"/>
            </div>
          </div>
        )}

        {index < totalPreguntas && (
          <Indexador 
            onIncrement={handleContinuarClick} 
            onDecrement={handleDecrementIndex} 
            index={index}
            showContinuar={opc2Clicked}
          />
        )}
      </div>
    </div>
  );
}
