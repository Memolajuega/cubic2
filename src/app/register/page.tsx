"use client";

import { useState } from "react";
import { createClient } from "../components/(supabase)/clientClient";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que todos los campos estén completos
    if (!nombre || !mail || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Inserta los datos del usuario en la tabla "usuarios"
    const { error: insertError } = await supabase
      .from("usuarios")
      .insert([{ 
        nombre, 
        mail, 
        password,
      }]);

    if (insertError) {
      setError(insertError.message);
    } else {
      // Redirige al login una vez registrado
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
    </div>
  );
}
