"use client";

import { useState } from "react";
import { createClient } from "../components/(supabase)/clientClient";
import Link from "next/link";
import styles from "./page.module.css";

export default function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que los campos estén completos
    if (!mail || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Inserta los datos del usuario en la tabla "usuarios"
    const { error: insertError } = await supabase
      .from("usuarios")
      .insert([{ 
        mail, 
        password,
      }]);

    if (insertError) {
      setError(insertError.message);
    } else {
      // Redirige al login una vez registrado
      window.location.href = "/";
    }
  };

  return (
    <div className="cuerpo">
      <h1 className="login">Registro</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="forms">
        <div>
          <label>Mail:</label>
          <input
            type="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {/* Enlace al login */}
      <p style={{ marginTop: "10px" }} className="registrate">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Logeate aquí.
        </Link>
      </p>
    </div>
  );
}
