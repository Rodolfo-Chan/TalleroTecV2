// import React from 'react';
//import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import TableBasicListaAlumnos from "../Data-Tables/datatable-lista-alumnos/TableBasicListaAlumnos";
import style from "../pages/css/alumnos.module.css"
//  import Button from '../components/Button/Button';
// import { useNavigate } from "react-router-dom";

const   HomeProfesor = () => {
  // const navigate = useNavigate();
  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
        <section className ={`${style['table-section']}`}>
{/* <div className ={`${style['header-data']}`}>
    <div className={`${style['name-and-name']}`}>
      <h1 className={`${style['name']}`}>ALUMNOS</h1> 
      {/* <div className={`${style['button-container']}`}>
        <Button 
          onClick={() => { navigate("FromAlumnosRegistro"); console.log("presionado"); }}
          label="Registrar alumno"
        />
      </div> */}
    {/* </div>
  </div> */} 
                <div>
                    <TableBasicListaAlumnos /> 
                </div>
        </section>
      </main>
    </div>
  );
};

export default HomeProfesor