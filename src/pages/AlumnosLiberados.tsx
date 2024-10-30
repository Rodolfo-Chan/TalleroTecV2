// import React from 'react';
//import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import TableBasicAlumnosLiberados from "../Data-Tables/datatable-alumnos-en-liberados/TableBasicAlumnosLiberados";
import style from "../pages/css/alumnos.module.css"

const   AlumnosLiberados = () => {
  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
        <section className ={`${style['table-section']}`}>
<div className ={`${style['header-data']}`}>
    <div className={`${style['name-and-name']}`}>
      <h1 className={`${style['name']}`}>ALUMNOS</h1> 

    </div>
  </div>
                <div>
                    <TableBasicAlumnosLiberados /> 
                </div>
        </section>
      </main>
    </div>
  );
};

export default AlumnosLiberados