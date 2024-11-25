"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "../components/(supabase)/clientClient";
import Opc1Type1 from "../components/Opc1-Type1"
import Opc2Type1 from "../components/Opc2-Type1"
import Opc3Type1 from "../components/Opc3-Type1"
import Indexador from "../components/indexador";
import Link from 'next/link';

export default function Home() {
  const [index, setIndex] = useState<number>(0); 
  const [pregunta, setPregunta] = useState<string>('');
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [opc1type1Clicked, setOpc1type1Clicked] = useState<boolean>(false);
  const [opc2type1Clicked, setOpc2type1Clicked] = useState<boolean>(false);
  const [opc3type1Clicked, setOpc3type1Clicked] = useState<boolean>(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<string>(''); // Respuesta correcta
  const [seleccionada, setSeleccionada] = useState<string>(''); // Respuesta seleccionada
  const [aciertos, setAciertos] = useState<number>(0); // Aciertos
  const [errores, setErrores] = useState<number>(0); // Errores

  const supabase = createClient();
  const totalPreguntas = 5;

  const fetchPreguntas = async () => {
    const { data: preguntas } = await supabase.from("textolargo").select("*");
    
    if (preguntas && preguntas.length > index) {
      setPregunta(preguntas[index].Pregunta);
      const respuestasArray = [
        preguntas[index].Rta1,
        preguntas[index].Rta2,
        preguntas[index].Rta3
      ];
      setRespuestaCorrecta(preguntas[index].Rta2); // Obtener la respuesta correcta
      setRespuestas(shuffleArray(respuestasArray)); // Mezclar las respuestas
    }
  };

  const shuffleArray = (array: string[]): string[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetchPreguntas();
    setOpc1type1Clicked(false); 
    setOpc2type1Clicked(false); 
    setOpc3type1Clicked(false);
    setSeleccionada(''); // Resetear respuesta seleccionada
  }, [index]);

  useEffect(() => {
    if (index >= totalPreguntas) {
      const updateCountry = async () => {
        const { error } = await supabase
          .from('usuarios')
          .update({ Nivel2: stars })
          .eq('id', localStorage.getItem("userId"));

        if (error) {
          console.error('Error updating record:', error);
        } else {
          console.log('Record updated successfully');
        }
      };

      updateCountry();
    }
  }, [index, totalPreguntas]);

  const handleIncrementIndex = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, totalPreguntas));
  };

  const handleDecrementIndex = () => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const progresoAncho = ((index) / totalPreguntas) * 100 + '%';

  const handleOpc1Click = () => {
    setSeleccionada(respuestas[0]);
    setOpc1type1Clicked(true);
    if (respuestas[0] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleOpc2Click = () => {
    setSeleccionada(respuestas[1]);
    setOpc2type1Clicked(true);
    if (respuestas[1] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleOpc3Click = () => {
    setSeleccionada(respuestas[2]);
    setOpc3type1Clicked(true);
    if (respuestas[2] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleContinuarClick = () => {
    handleIncrementIndex();
    setOpc1type1Clicked(false); 
    setOpc2type1Clicked(false); 
    setOpc3type1Clicked(false);
    setSeleccionada('');
  };

  const stars = Math.round((aciertos / totalPreguntas) * 3);

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
          <Link href="/home">
            <img src="/flecha1.png" alt="Flecha" className="flecha" />
          </Link>
          <div className="barrafija">
            <div className="progreso" style={{ width: progresoAncho }}></div>
          </div>
        </div>

        {index < totalPreguntas ? (
          <div className="nivel">
            <div className="pregunta">{pregunta}</div>
            <Opc1Type1 
              respuesta={respuestas[0]} 
              isClicked={opc1type1Clicked} 
              setIsClicked={setOpc1type1Clicked} 
              isCorrect={respuestas[0] === respuestaCorrecta} 
              seleccionada={seleccionada}
              onClick={handleOpc1Click}
            />
            <Opc2Type1 
              respuesta={respuestas[1]} 
              isClicked={opc2type1Clicked} 
              setIsClicked={setOpc2type1Clicked} 
              isCorrect={respuestas[1] === respuestaCorrecta} 
              seleccionada={seleccionada}
              onClick={handleOpc2Click}
            />
            <Opc3Type1 
              respuesta={respuestas[2]} 
              isClicked={opc3type1Clicked} 
              setIsClicked={setOpc3type1Clicked} 
              isCorrect={respuestas[2] === respuestaCorrecta} 
              seleccionada={seleccionada}
              onClick={handleOpc3Click}
            />
          </div>
        ) : (
          <div className="victoria">
            <div className="cuadro">
              <h1>¡Felicitaciones, ganaste!</h1>
              <h2>Sumaste {stars} estrellas</h2>
              <img src="/star.png" alt="estrella" className="star"/>
            </div>
          </div>
        )}

        {index < totalPreguntas && (
          <Indexador 
            onIncrement={handleContinuarClick} 
            onDecrement={handleDecrementIndex} 
            index={index}
            showContinuar={opc1type1Clicked || opc2type1Clicked || opc3type1Clicked} 
          />
        )}
      </div>
    </div>
  );
}