import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "../pages/css/talleres.module.css"
import Button from '../components/Button/Button';
import { useNavigate } from "react-router-dom";
import TableBasicTalleres from '../Data-Tables/datatable-talleres/TableBasicTalleres';

const Talleres: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
        <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
        <h1 className ={`${style['name']}`}>TALLERES</h1>
          
       
        <div className ={`${style['button-container']}`} >    
       
            <Button onClick={() => {  navigate("FormTalleresRegistro")
                console.log("presionado");
                }}
                label="Registrar taller"
            />
        </div>
        </div>
</div>

<div>
<TableBasicTalleres /> 
</div>
        </section>
      </main>
    </div>
  );
};

export default Talleres;
