import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "../pages/css/tallerescrear.module.css"
import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom";
import TableBasicTalleresCrear from '../Data-Tables/datatable-talleres-crear/TableBasicTalleresCrear';

const TalleresCrear: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
        <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
        <h1 className ={`${style['name']}`}>CATALOGO TALLERES</h1>
          
       
        <div className ={`${style['button-container']}`} >    
       
            <Button onClick={() => {  navigate("FormTalleresCrearRegistro")
                console.log("presionado");
                }}
                label="Crear taller"
            />
        </div>
        </div>
</div>

<div>
<TableBasicTalleresCrear /> 
</div>
        </section>
      </main>
    </div>
  );
};

export default TalleresCrear;
