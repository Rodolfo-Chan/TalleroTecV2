import { useState, useEffect } from "react";
import style from "../pages/css/home.module.css";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineSportsKabaddi, MdSportsVolleyball } from "react-icons/md";
import { TbLocationStar } from "react-icons/tb";
import Grafico from "../components/Graficos/Grafico";
import Grafico2 from "../components/Graficos/Grafico2";

type TallerSubgrupo = {
  ubicacion: string;
};

type TallerSupergrupo = {
  id_taller_catalogo: number;
  nombre_taller: string;
  estatus_taller: boolean;
};

const Home = () => {
  const [alumnosCount, setAlumnosCount] = useState(0);
  const [talleresSupergrupoCount, setTalleresSupergrupoCount] = useState(0);
  const [instructoresCount, setInstructoresCount] = useState(0);
  const [locacionesCount, setLocacionesCount] = useState(0);

  // Obtener datos de las APIs
  useEffect(() => {
    // Obtener alumnos
    fetch("https://drftallerotecdj.onrender.com/talleres/api/alumnos/")
      .then((response) => response.json())
      .then((data) => setAlumnosCount(data.length)) // Asumimos que data es un array
      .catch((error) => console.error("Error fetching alumnos:", error));

    // Obtener talleres supergrupo y filtrar solo los habilitados
    fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/")
      .then((response) => response.json())
      .then((data: TallerSupergrupo[]) => {

        // Filtrar los talleres habilitados (estatus_taller === true)
        const talleresHabilitados = data.filter(taller => taller.estatus_taller === true);
        setTalleresSupergrupoCount(talleresHabilitados.length); 
      })
      .catch((error) => console.error("Error fetching supergrupos:", error));

    // Obtener instructores
    fetch("https://drftallerotecdj.onrender.com/talleres/api/instructores/")
      .then((response) => response.json())
      .then((data) => setInstructoresCount(data.length))
      .catch((error) => console.error("Error fetching instructores:", error));

    // Obtener locaciones
    fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/")
      .then((response) => response.json())
      .then((data: TallerSubgrupo[]) => {
        const uniqueLocations = new Set(data.map((item) => item.ubicacion));
        setLocacionesCount(uniqueLocations.size);
      })
      .catch((error) => console.error("Error fetching locaciones:", error));
  }, []);

  return (
    <div className={`${style['home-container']}`}>
      <header className={`${style['header']}`}>
        <div className={`${style['header-content']}`}>
          <h1 className={`${style['titulo']}`}>DEPARTAMENTO DE ACTIVIDADES EXTRAESCOLARES</h1>
        </div>
      </header>

      <main className={`${style['main-content']}`}>
        <section className={`${style['cards']}`}>
          <div className={`${style['card']}`}>
            <div className={`${style['card-content']}`}>
              <div className={`${style['card-text']}`}>
                <h2>Alumnos Activos</h2>
                <p>{alumnosCount}</p>
              </div>
              <PiStudentFill className={`${style['card-icon']}`} />
            </div>
          </div>
          <div className={`${style['card']}`}>
            <div className={`${style['card-content']}`}>
              <div className={`${style['card-text']}`}>
                <h2>Talleres habilitados</h2>
                <p>{talleresSupergrupoCount}</p>
              </div>
              <MdSportsVolleyball className={`${style['card-icon']}`} />
            </div>
          </div>

          <div className={`${style['card']}`}>
            <div className={`${style['card-content']}`}>
              <div className={`${style['card-text']}`}>
                <h2>Instructores</h2>
                <p>{instructoresCount}</p>
              </div>
              <MdOutlineSportsKabaddi className={`${style['card-icon']}`} />
            </div>
          </div>
          <div className={`${style['card']}`}>
            <div className={`${style['card-content']}`}>
              <div className={`${style['card-text']}`}>
                <h2>Locaciones</h2>
                <p>{locacionesCount}</p>
              </div>
              <TbLocationStar className={`${style['card-icon']}`} />
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

