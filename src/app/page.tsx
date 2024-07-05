import styles from "./page.module.css";
import { createClient } from "./components/(supabase)/clientClient";

export default async function Home() {
  const supabase = createClient()

  const {data: preguntas} = await supabase.from("preguntas").select("*")
  return (
    <div>
      {JSON.stringify(preguntas, null, 2)}
    </div>
  );
}
