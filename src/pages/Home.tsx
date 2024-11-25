import React, { useState, useEffect } from "react";
import style from "../pages/css/home.module.css";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineSportsKabaddi, MdSportsVolleyball } from "react-icons/md";
import { TbLocationStar } from "react-icons/tb";
import Grafico from "../components/Graficos/Grafico";
import Grafico2 from "../components/Graficos/Grafico2";
import { SiHomeadvisor } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1>Dashboard <SiHomeadvisor /></h1>
        </div>
        <div>
          <p>
            <FcGoogle />
            {userEmail || "Usuario no identificado"}
          </p>
        </div>
      </header>

      <main className={style['main-content']}>
        <section className={style['cards']}>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <h2>Alumnos Activos</h2>
                <p>40</p>
              </div>
              <PiStudentFill className={style['card-icon']} />
            </div>
          </div>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <h2>Talleres habilitados</h2>
                <p>21</p>
              </div>
              <MdSportsVolleyball className={style['card-icon']} />
            </div>
          </div>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <h2>Instructores</h2>
                <p>50</p>
              </div>
              <MdOutlineSportsKabaddi className={style['card-icon']} />
            </div>
          </div>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <h2>Locaciones</h2>
                <p>18</p>
              </div>
              <TbLocationStar className={style['card-icon']} />
            </div>
          </div>
          <Grafico />
          <Grafico2 />
        </section>
      </main>
    </div>
  );
};

export default Home;
