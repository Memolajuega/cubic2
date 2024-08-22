import styles from "./page.module.css";
import { createClient } from "./components/(supabase)/clientClient";
import Barra from "./components/Barra"
import Opc1 from "./components/Opc1"
import Opc2 from "./components/Opc2"
import Opc3 from "./components/Opc3"

export default async function Home() {
  const supabase = createClient()

  const {data: preguntas} = await supabase.from("preguntas").select("*")
  const primeraPregunta = preguntas ? preguntas[0].Pregunta : '';
  const respuesta1 = preguntas ? preguntas[0].Rta1 : '';
  const respuesta2 = preguntas ? preguntas[0].Rta2 : '';
  const respuesta3 = preguntas ? preguntas[0].Rta3 : '';

  console.log(primeraPregunta);

  return (
    <div>
      <div className="cuerpo">
        <div className="sidemenu">
          <h1>CUBIC</h1>
          <a href="">Aprender</a>
          <a href="">Perfil</a>
          <a href="">Desafíos</a>
        </div>
        <div className="top">
          <img src="/flecha1.png" alt="Flecha" className="flecha" />
        </div>
        <div className="nivel">
          <div className="pregunta">{primeraPregunta}</div>
          <Opc1 respuesta={respuesta1} />
          <Opc2 respuesta={respuesta2} />  
          <Opc3 respuesta={respuesta3}/>
        </div>
        <div className="footer">
          <div className = "anterior">
            <h2>Anterior</h2>
          </div>
          <div className = "continuar">
            <h2>Continuar</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
