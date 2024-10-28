// import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "../pages/css/inscripciones.module.css";
import Button from '../components/Button/Button';
import TableBasicInscripciones from '../Data-Tables/datatable-inscripciones/TableBasicInscripciones';
import { useNavigate } from "react-router-dom";

const Inscripciones: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
        <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
            <h1 className ={`${style['name']}`}>Inscripciones</h1>
       

        <div className ={`${style['button-container']}`} >    

            <Button onClick={() => {  navigate("FormInscripcionesRegistro")
                console.log("presionado");
                }}
                label="Registrar inscripción"
            />
        </div>
        </div>



</div>

<div>
<TableBasicInscripciones /> 
</div>
        </section>
      </main>
    </div>
  );
};

export default Inscripciones;
