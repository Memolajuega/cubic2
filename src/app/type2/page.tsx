"use client"

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "../components/(supabase)/clientClient";
import Indexador from "../components/indexador";
import Link from 'next/link';
import Opc2 from "../components/Opc2";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [pregunta, setPregunta] = useState('');
  const [respuesta2, setRespuesta2] = useState('');
  const [opc2Clicked, setOpc2Clicked] = useState(false);
  const [userResponse, setUserResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = () => {
    if (userResponse === respuesta2) {
      setOpc2Clicked(true); // Esto habilita el botón de "Continuar"
      setUserResponse(''); // Borra el campo de respuesta
    } else {
      alert("Respuesta incorrecta. Intenta de nuevo.");
    }
  };

  const supabase = createClient();
  const totalPreguntas = 3;

  const fetchPreguntas = async () => {
    const { data: preguntas } = await supabase.from("escribir").select("*");
    
    if (preguntas && preguntas.length > index) {
      setPregunta(preguntas[index].Pregunta);
      setRespuesta2(preguntas[index].Rta);
    }
  };

  useEffect(() => {
    fetchPreguntas();
    setOpc2Clicked(false); 
  }, [index]);

  const handleIncrementIndex = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, totalPreguntas));
  };

  const handleDecrementIndex = () => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const progresoAncho = ((index) / totalPreguntas) * 100 + '%';

  const handleContinuarClick = () => {
    handleIncrementIndex();
    setOpc2Clicked(false); 
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
            <Opc2 respuesta={respuesta2} isClicked={opc2Clicked} setIsClicked={setOpc2Clicked} />
            <input 
              type="text" 
              value={userResponse} 
              onChange={handleInputChange} 
              placeholder="Escribe tu respuesta" 
            />
            <button onClick={handleSubmit}>Enviar</button>
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
