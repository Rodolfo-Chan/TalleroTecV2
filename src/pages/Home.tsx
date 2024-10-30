// import "../components/styles.css";
import style from "../pages/css/home.module.css";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineSportsKabaddi, MdSportsVolleyball } from "react-icons/md";
import { TbLocationStar } from "react-icons/tb";
import Grafico from "../components/Graficos/Grafico";
import Grafico2 from "../components/Graficos/Grafico2";

const Home = () => {
  return (
    <div className ={`${style['home-container']}`}>
      <header className ={`${style['header']}`}>
        <div className ={`${style['header-content']}`}>
          <h1 className ={`${style['titulo']}`}>DEPARTAMENTO DE ACTIVIDADES EXTRAESCOLARES</h1>
        </div>
      </header>

      <main className ={`${style['main-content']}`}>
        <section className ={`${style['cards']}`}>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Alumnos Activos</h2>
                <p>40</p>
              </div>
              <PiStudentFill className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Talleres habilitados </h2>
                <p>21</p>
              </div>
              <MdSportsVolleyball className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Instructores</h2>
                <p>50</p>
              </div>
              <MdOutlineSportsKabaddi className ={`${style['card-icon']}`} />
            </div>
          </div>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Locaciones</h2>
                <p>18</p>
              </div>
              <TbLocationStar className ={`${style['card-icon']}`} />
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
