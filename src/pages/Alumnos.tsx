
// import React from 'react';
//import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import TableBasicAlumnos from '../Data-Tables/datatable-alumnos/TableBasicAlumnos';
import style from "../pages/css/alumnos.module.css"
 import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom";

const   Alumnos = () => {
  const navigate = useNavigate();
  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
        <section className ={`${style['table-section']}`}>
<div className ={`${style['header-data']}`}>
    <div className={`${style['name-and-name']}`}>
      <h1 className={`${style['name']}`}>ALUMNOS</h1> 
      <div className={`${style['button-container']}`}>
        <Button 
          onClick={() => { navigate("FromAlumnosRegistro"); console.log("presionado"); }}
          label="Registrar alumno"
        />
      </div>
    </div>
  </div>
                <div>
                    <TableBasicAlumnos /> 
                </div>
        </section>
      </main>
    </div>
  );
};

export default Alumnos
