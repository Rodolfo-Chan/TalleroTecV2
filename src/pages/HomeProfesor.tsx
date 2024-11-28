// import React from 'react';
//import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import { FcGoogle } from "react-icons/fc";
import TableBasicListaAlumnos from "../Data-Tables/datatable-lista-alumnos/TableBasicListaAlumnos";
import style from "../pages/css/alumnos.module.css"
//  import Button from '../components/Button/Button';
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const   HomeProfesor = () => {
  const [userEmail, setUserEmail] = useState(""); // Mover el hook aquí

  // Hook para obtener el correo electrónico del localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);
  // const navigate = useNavigate();
  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <p>
          <FcGoogle />
          {userEmail || "Usuario no identificado"}
        </p>
        <img src="https://www.shutterstock.com/image-photo/champions-creative-collage-men-women-600nw-2492320157.jpg" alt="" />
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