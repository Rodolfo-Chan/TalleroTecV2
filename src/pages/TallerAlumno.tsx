import React, { useEffect, useState } from 'react';
import style from "./css/talleresalumno.module.css";
import TableBasicTalleresRegistro from '../Data-Tables/datatable-talleres-registro/TableBasicTalleresRegistro';

import { PiStudentFill } from "react-icons/pi";
import DescargarArchivo from '../components/Documentos/Descargararchivo/DescargarArchivo';

const TallerAlumno: React.FC = () => {
  const [alumno, setAlumno] = useState<any>(null);
  const [totalPuntos, setTotalPuntos] = useState(0);

  useEffect(() => {
    const fetchAlumnoData = async () => {
      try {
        // Obtener datos del alumno
        const resAlumno = await fetch("https://drftallerotecdj.onrender.com/talleres/api/alumnos/5/"); //Estoy usando un alumno fijo bro
        const alumnoData = await resAlumno.json();
        setAlumno(alumnoData);

        // Obtener inscripciones
        const resInscripciones = await fetch("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/");
        const inscripcionesData = await resInscripciones.json();

        // Filtrar inscripciones acreditadas del alumno
        const inscripcionesAcreditadas = inscripcionesData.filter(
          (inscripcion: any) => inscripcion.id_alumno === alumnoData.id_alumno && inscripcion.estatus === "Acreditado"
        );

        // Obtener subgrupos para sumar puntos
        const resSubgrupos = await fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");
        const subgruposData = await resSubgrupos.json();

        // Calcular los puntos totales
        const puntos = inscripcionesAcreditadas.reduce((total: number, inscripcion: any) => {
          const subgrupo = subgruposData.find(
            (sub: any) => sub.id_taller_registro === inscripcion.id_taller_registro
          );
          return subgrupo ? total + subgrupo.puntos_taller : total;
        }, 0);

        setTotalPuntos(puntos);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchAlumnoData();
  }, []);

  return (
    <div className={style["home-container"]}>
      <main className={style["main-content"]}>
        <section className={style["cards"]}>
          <div className={style["card"]}>
            <div className={style["card-content"]}>
              <div className={style["card-text"]}>
                <h2>Total de puntos acumulados</h2>
                {alumno ? (
                  <>
                    <p>Alumno: {`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</p>
                    <p>Matrícula: {alumno.matricula_alumno}</p>
                    <p>Puntos: {totalPuntos}/200</p>
                    <br />
                    <DescargarArchivo idAlumno={5} />

                  </>
                ) : (
                  <p>Cargando datos del alumno...</p>
                )}
              </div>
              <PiStudentFill className={style["card-icon"]} />
            </div>
            
          </div>
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
