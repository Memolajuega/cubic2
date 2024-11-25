"use client";

import { useEffect, useState } from 'react';
import { createClient } from "../components/(supabase)/clientClient";
import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  
  const supabase = createClient();

  const [niveles, setNiveles] = useState({ Nivel1: 0, Nivel2: 0, Nivel3: 0 });

  const starImages = [
    "/none.png", // Imagen para 0 estrellas
    "/star.png", // Imagen para 1 estrella
    "/dos.png", // Imagen para 2 estrellas
    "/tres.png", // Imagen para 3 estrellas
  ];

  useEffect(() => {
    const fetchProgreso = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        supabase
          .from("usuarios")
          .select("Nivel1, Nivel2, Nivel3")
          .eq("id", userId)
          .then(({ data }) => {
            if (data && data.length > 0) {
              setNiveles(data[0]);
            }
          })
      }
    };

    fetchProgreso();
  }, []);

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
        
        <div className="nvl1">
          <img src={starImages[niveles.Nivel1]} alt={`${niveles.Nivel1} estrellas`} />
          <Link href="/type">
            <div className="box1">
              <h1>NIVEL 1</h1>
            </div>
          </Link>
        </div>

        <div className="nvl2">
          <img src={starImages[niveles.Nivel2]} alt={`${niveles.Nivel2} estrellas`} />
          <Link href="/type1">
            <div className="box2">
              <h1>NIVEL 2</h1>
            </div>
          </Link>
        </div>

        <div className="nvl3">
          <img src={starImages[niveles.Nivel3]} alt={`${niveles.Nivel3} estrellas`} />
          <Link href="/type2">
            <div className="box3">
              <h1>NIVEL 3</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

