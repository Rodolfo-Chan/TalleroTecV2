 import React from 'react';
// import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import TableBasicProfesores from '../Data-Tables/datatable-profesores/TableBasicProfesores';
import style from "../pages/css/profesores.module.css";
import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom";

const Profesores: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
      <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
            <h1 className ={`${style['name']}`}>PROFESORES</h1>
    
        <div className ={`${style['button-container']}`} >    
            <Button
            onClick={() => { navigate("FromProfesoresRegistro"); console.log("presionado");}}
                label="Registrar profesor"
            />
        </div>
        </div>
</div>
<div>
    <TableBasicProfesores /> 
    </div>
        </section>
      </main>
    </div>
  );
};

export default Profesores;
