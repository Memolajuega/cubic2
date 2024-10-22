"use client";

import { useState } from "react";
import { createClient } from "../components/(supabase)/clientClient";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que los campos estén completos
    if (!mail || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Busca al usuario en la base de datos
    const { data: user, error: selectError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("mail", mail)
      .eq("password", password) // Verifica que el password coincida
      .single(); // single() asegura que solo obtienes un resultado

    if (selectError || !user) {
      setError("Mail o contraseña incorrectos.");
    } else {
      // Almacena el nombre del usuario en localStorage
      localStorage.setItem("userName", user.nombre);

      // Redirige a la página principal una vez que el usuario ha iniciado sesión
      router.push("/");
    }
  };

  return (
    <div className="cuerpo">
      <h1 className="login">Ingresar</h1>
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
