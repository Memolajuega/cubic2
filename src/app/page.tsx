"use client";

import { useState } from "react";
import { createClient } from "./components/(supabase)/clientClient";
import Link from "next/link";
import styles from "./page.module.css";

export default function Login() {
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
      // Almacena el user_id y nombre del usuario en localStorage
      localStorage.setItem("userId", user.id); // Almacenamos el user_id
      console.log(localStorage.getItem("userId"));
      // Redirige a la página principal una vez que el usuario ha iniciado sesión
      window.location.href = "/home";
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
      {/* Enlace a la página de registro */}
      <p style={{ marginTop: "10px" }} className="registratehere">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Regístrate aquí.
        </Link>
      </p>
    </div>
  );
}
