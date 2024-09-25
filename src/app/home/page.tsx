"use client";

import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
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
          <img src="/star.png" alt="" />
          <Link href="/">
            <div className="box1">
              <h1>NIVEL 1</h1>
            </div>
          </Link>
        </div>

        <div className="nvl2">
          <img src="/star.png" alt="" />
          <Link href="/type1">
            <div className="box2">
              <h1>NIVEL 2</h1>
            </div>
          </Link>
        </div>

        <div className="nvl3">
          <img src="/star.png" alt="" />
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
