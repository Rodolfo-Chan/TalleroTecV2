import React from 'react';
// import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "./css/talleresalumno.module.css"
//  import Button from '../components/Button/Button';
//  import { useNavigate } from "react-router-dom";
import TableBasicTalleresRegistro from '../Data-Tables/datatable-talleres-registro/TableBasicTalleresRegistro';
import { PiStudentFill } from "react-icons/pi";
import DescargarArchivo from '../components/Documentos/Descargararchivo/DescargarArchivo';

const TallerAlumno: React.FC = () => {
//  const navigate = useNavigate();

  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['cards']}`}>
          <div className ={`${style['card']}`}>
            <div className ={`${style['card-content']}`}>
              <div className ={`${style['card-text']}`}>
                <h2>Total de puntos acumulados</h2>
                <p>Alumno: Chan Ceme Manuel Ananias</p>
                <p>Matricula: 20890139</p>
                <p>Puntos: 90/200</p>
                <br />
                <DescargarArchivo 
        fileName="Constancia_cumplimiento.pdf" 
        downloadUrl="/ruta/al/archivo/participantes.pdf"  
        downloadText="Generar Constancia" // Texto personalizado para el botón
        showDownloadText={true} // Habilitar el texto del botón
        showFileName={false}
      />

              </div>
              <PiStudentFill className ={`${style['card-icon']}`} />

              {/* Puedes agregar un ícono aquí si lo deseas */}
            </div>
          </div>
          {/* Agrega más tarjetas según sea necesario */}
        </section>
      <section className ={`${style['table-section']}`}>
        <div className ={`${style['header-data']}`}>
        <div className ={`${style['name-and-name']}`} >    
        <h1 className ={`${style['name']}`}>HISTORIAL DE TALLERES</h1>
          
       
        {/* <div className ={`${style['button-container']}`} >    
        <DescargarArchivo fileName="Evaluacion_al_deesmpeño.pdf" downloadUrl="/ruta/al/archivo/participantes.pdf" showFileName={true}  showDownloadText={false}/>

            <Button onClick={() => {  navigate("FormTalleresRegistro")
                console.log("presionado");
                }}
                label="Generar constancia"
            />
        </div> */}
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