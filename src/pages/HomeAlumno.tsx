// import React from "react";
import style from "../pages/css/homealumno.module.css"

import { MdSportsVolleyball } from "react-icons/md";

import { BiRun } from "react-icons/bi";
import { MdOutlineSportsEsports } from "react-icons/md";
import { MdOutlineSportsMartialArts } from "react-icons/md";
import { MdOutlineEmojiNature } from "react-icons/md";
import { GiPaintBrush } from "react-icons/gi";
import { GiDrum } from "react-icons/gi";




import { SiHomeadvisor } from "react-icons/si";

const HomeAlumno = () => {
  return (
    <div className ={`${style['home-container']}`}>
      <header className ={`${style['header']}`}>
        <div className ={`${style['header-content']}`}>
          <h1>Bienvenido <SiHomeadvisor /></h1>
<h1> Seleccione el taller de su preferencia</h1>
<p className ={`${style['nota']}`}>Nota: Solo se puede seleccionar un taller por periodo y favor de verificar que el taller no interfiera con sus actividades académicas</p>
        </div>
      </header>

      <main className ={`${style['main-content']}`}>
        <section className ={`${style['cards']}`}>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Atletismo</h2>
                <p>Cupo disponible 02/30</p>
              </div>
              <BiRun className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Voleibol varonil</h2>
                <p>Cupo disponible 19/30</p>
              </div>
              <MdSportsVolleyball className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Voleibol femenil</h2>
                <p>Cupo disponible 9/30</p>
              </div>
              <MdSportsVolleyball className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Esport</h2>
                <p>Cupo disponible 27/30</p>
              </div>
              <MdOutlineSportsEsports className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Taekwondo</h2>
                <p>Cupo disponible 30/30</p>
              </div>
              <MdOutlineSportsMartialArts className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Cuidado ambiental</h2>
                <p>Cupo disponible 29/30</p>
              </div>
              <MdOutlineEmojiNature className ={`${style['card-icon']}`} />
            </div>
          </div>
          
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Pintura</h2>
                <p>Cupo disponible 9/30</p>
              </div>
              <GiPaintBrush className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Grupo de batucada</h2>
                <p>Cupo disponible 16/30</p>
              </div>
              <GiDrum className ={`${style['card-icon']}`} />
            </div>
          </div>
        </section>



        
      </main>
    </div>
  );
};

export default HomeAlumno;