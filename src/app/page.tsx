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

  return (
    <div>
      <div className="cuerpo">
        <div className="sidemenu">
          <img src="/MENU.png" alt="Menu" className="menu" />
        </div>
        <div className="top">
          <img src="/flecha1.png" alt="Flecha" className="flecha" />
          <img src="/corazon1.png" alt="Corazon" className="corazon" />
        </div>
        <div className="nivel">
          <Opc1/>
          <div className="rta1">{respuesta1}</div>
          <Opc2/>
          <div className="prg">{primeraPregunta}</div>  
          <div className="rta2">{respuesta2}</div>
          <Opc3/>
          <div className="rta3">{respuesta3}</div>
        </div>
        <div className="footer">
          <img src="/continuar.png" alt="continuar" className="continuar"/>
        </div>
        {JSON.stringify(preguntas, null, 2)}
      </div>
    </div>
  );
}
