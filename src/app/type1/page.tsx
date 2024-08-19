import styles from "./page.module.css";
import { createClient } from "../components/(supabase)/clientClient";
import Barra from "../components/Barra"
import Opc1Type1 from "../components/Opc1-Type1"
import Opc2Type1 from "../components/Opc2-Type1"
import Opc3Type1 from "../components/Opc3-Type1"

export default async function Home() {
  const supabase = createClient()

  const {data: preguntas} = await supabase.from("preguntas").select("*")
  const primeraPregunta = preguntas ? preguntas[0].Pregunta : '';
  const respuesta1 = preguntas ? preguntas[0].Rta1 : '';
  const respuesta2 = preguntas ? preguntas[0].Rta2 : '';
  const respuesta3 = preguntas ? preguntas[0].Rta3 : '';

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
          <Opc1Type1 respuesta={respuesta1} />
          <Opc2Type1 respuesta={respuesta2} />  
          <Opc3Type1 respuesta={respuesta3}/>
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
