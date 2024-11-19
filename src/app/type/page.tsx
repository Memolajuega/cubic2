'use client'; // Añadir esta línea

import { useState, useEffect } from "react";
import { createClient } from "../components/(supabase)/clientClient";
import Opc1 from "../components/Opc1";
import Opc2 from "../components/Opc2";
import Opc3 from "../components/Opc3";
import Indexador from "../components/indexador";
import Link from 'next/link';

export default function Home() {
  const [index, setIndex] = useState<number>(0); 
  const [pregunta, setPregunta] = useState<string>('');
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [opc1Clicked, setOpc1Clicked] = useState<boolean>(false);
  const [opc2Clicked, setOpc2Clicked] = useState<boolean>(false);
  const [opc3Clicked, setOpc3Clicked] = useState<boolean>(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<string>(''); // Respuesta correcta
  const [seleccionada, setSeleccionada] = useState<string>(''); // Respuesta seleccionada
  const [aciertos, setAciertos] = useState<number>(0); // Aciertos
  const [errores, setErrores] = useState<number>(0); // Errores

  const supabase = createClient();
  const totalPreguntas = 5;

  const fetchPreguntas = async () => {
    const { data: preguntas } = await supabase.from("preguntas").select("*");
    
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
    setOpc1Clicked(false); 
    setOpc2Clicked(false); 
    setOpc3Clicked(false);
    setSeleccionada(''); // Resetear respuesta seleccionada
  }, [index]);

  const handleIncrementIndex = () => {
    setIndex(prevIndex => Math.min(prevIndex + 1, totalPreguntas));
  };

  const handleDecrementIndex = () => {
    setIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const progresoAncho = ((index) / totalPreguntas) * 100 + '%';

  const handleOpc1Click = () => {
    setSeleccionada(respuestas[0]);
    setOpc1Clicked(true);
    if (respuestas[0] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleOpc2Click = () => {
    setSeleccionada(respuestas[1]);
    setOpc2Clicked(true);
    if (respuestas[1] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleOpc3Click = () => {
    setSeleccionada(respuestas[2]);
    setOpc3Clicked(true);
    if (respuestas[2] === respuestaCorrecta) {
      setAciertos(prevAciertos => prevAciertos + 1);
    } else {
      setErrores(prevErrores => prevErrores + 1);
    }
  };

  const handleContinuarClick = () => {
    handleIncrementIndex();
    setOpc1Clicked(false); 
    setOpc2Clicked(false); 
    setOpc3Clicked(false);
    setSeleccionada('');
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
            <Opc1 
              respuesta={respuestas[0]} 
              isClicked={opc1Clicked} 
              isCorrect={respuestas[0] === respuestaCorrecta} 
              onClick={handleOpc1Click}
            />
            <Opc2 
              respuesta={respuestas[1]} 
              isClicked={opc2Clicked} 
              isCorrect={respuestas[1] === respuestaCorrecta} 
              onClick={handleOpc2Click}
            />
            <Opc3 
              respuesta={respuestas[2]} 
              isClicked={opc3Clicked} 
              isCorrect={respuestas[2] === respuestaCorrecta} 
              onClick={handleOpc3Click}
            />
          </div>
        ) : (
          <div className="victoria">
            <div className="cuadro">
              <h1>¡Felicitaciones, ganaste!</h1>
              <h2>Sumaste {aciertos} estrellas</h2>
              <img src="/star.png" alt="estrella" className="star"/>
            </div>
          </div>
        )}

        {index < totalPreguntas && (
          <Indexador 
            onIncrement={handleContinuarClick} 
            onDecrement={handleDecrementIndex} 
            index={index}
            showContinuar={opc1Clicked || opc2Clicked || opc3Clicked} 
          />
        )}
      </div>
    </div>
  );
}
