import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "../pages/css/talleres.module.css"
import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom";
import TableBasicTalleresRegistro from '../Data-Tables/datatable-talleres-registro/TableBasicTalleresRegistro';

const TallerAlumno: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
        <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
        <h1 className ={`${style['name']}`}>REGISTRO TALLERES</h1>
          
       
        <div className ={`${style['button-container']}`} >    
       
            <Button onClick={() => {  navigate("FormTalleresRegistro")
                console.log("presionado");
                }}
                label="Generar constancia"
            />
        </div>
        </div>
</div>

<div>
<TableBasicTalleresRegistro /> 
</div>
        </section>
      </main>
    </div>
  );
};

export default TallerAlumno;