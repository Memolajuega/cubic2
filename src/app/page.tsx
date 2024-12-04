"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className="cuerpo">
       <div className="contenedorimagen">
        <img 
          src="/mascota.png" 
          className="landingimg"
        />
      </div>
      <div className="contenedortexto">
        <h1 className="tit">CUBIC</h1>
        <h2 className="subtit">La mejor herramienta para <br/> aprender programacion</h2>
        <Link href="/login">
          <button className="entrar">COMENZAR</button>
        </Link>
      </div>
    </div>
  );
}
