"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "../components/(supabase)/clientClient";
import Indexador from "../components/indexador";
import Link from "next/link";
import Opc2 from "../components/Opc2";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [pregunta, setPregunta] = useState("");
  const [respuesta2, setRespuesta2] = useState("");
  const [opc2Clicked, setOpc2Clicked] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [buttonColor, setButtonColor] = useState("#4B1572"); // Color inicial del botón
  const [aciertos, setAciertos] = useState<number>(0); // Aciertos

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = () => {
    if (userResponse === respuesta2) {
      setOpc2Clicked(true); // Esto habilita el botón de "Continuar"
      setButtonColor("#4B9C61"); // Cambia el color del botón al verde
      setUserResponse(""); // Borra el campo de respuesta
      setAciertos(prevAciertos => prevAciertos + 1);
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
    if (index >= totalPreguntas) {
      const updateCountry = async () => {
        const { error } = await supabase
          .from('usuarios')
          .update({ Nivel3: stars })
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

  useEffect(() => {
    fetchPreguntas();
    setOpc2Clicked(false);
    setButtonColor("#4B1572"); // Restaura el color inicial del botón al cambiar de pregunta
  }, [index]);

  const handleIncrementIndex = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, totalPreguntas));
  };

  const handleDecrementIndex = () => {
    setIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const progresoAncho = (index / totalPreguntas) * 100 + "%";

  const handleContinuarClick = () => {
    handleIncrementIndex();
    setOpc2Clicked(false);
  };

  const stars = Math.round((aciertos / totalPreguntas) * 3);

  return (
    <div>
      <div className="cuerpo">
        <div className="sidemenu">
          <h1>CUBIC</h1>
          <div>
            <img src="/brain.png" alt="" />
            <a href="">Aprender</a>
          </div>
          <div>
            <img src="/user.png" alt="" />
            <a href="">Perfil</a>
          </div>
          <div>
            <img src="/target.png" alt="" />
            <a href="">Desafíos</a>
          </div>
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
            <input
              type="text"
              value={userResponse}
              onChange={handleInputChange}
              placeholder="Escribe tu respuesta"
              className="escribir"
            />
            <button
              onClick={handleSubmit}
              className="enviar"
              style={{ backgroundColor: buttonColor }}
            >
              Enviar
            </button>
          </div>
        ) : (
          <div className="victoria">
            <div className="cuadro">
              <h1>¡Felicitaciones, ganaste!</h1>
              <h2>Sumaste {stars} estrellas</h2>
              <img src="/star.png" alt="estrella" className="star" />
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
