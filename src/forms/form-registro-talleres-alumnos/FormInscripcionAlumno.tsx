import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../form-registro-talleres-alumnos/form-incripcion-alumno.module.css";
import ButtonRegistro from "../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../components/Input/Input";
import ComponentAlert from "../../components/Alert/ComponentAlert";

const FormInscripcionAlumno: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tallerData, setTallerData] = useState<any>(null);
  const [nombreTaller, setNombreTaller] = useState<string>("");
  const [periodoEscolar, setPeriodoEscolar] = useState<string>("");
  const [turnoTaller, setTurnoTaller] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [diasTaller, setDiasTaller] = useState<string>("");
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState(""); 

  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "success">("success");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchTallerData = async () => {
      try {
        if (!location.state || !location.state.tallerData) {
          throw new Error("No se encontró información del taller seleccionado.");
        }
  
        const { id } = location.state.tallerData;
        console.log("ID del taller recibido:", id);
  
        const [subgrupoRes, supergrupoRes, alumnoRes] = await Promise.all([ 
          fetch(`https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/${id}/`),
          fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/"),
          fetch("https://drftallerotecdj.onrender.com/talleres/api/alumnos/5/") // Estoy usando un id de un alumno fijo bro
        ]);
  
        const subgrupoData = await subgrupoRes.json();
        const supergrupoData = await supergrupoRes.json();
        const alumnoData = await alumnoRes.json();
  
        const nombreTallerEncontrado = Array.isArray(supergrupoData) 
          ? supergrupoData.find((supergrupo: any) => supergrupo.id_taller_catalogo === subgrupoData.id_taller_catalogo)?.nombre_taller
          : supergrupoData.nombre_taller;
  
        const tipoTaller = subgrupoData.tipo_taller || "Tipo no especificado";
  
        if (!nombreTallerEncontrado) {
          throw new Error("No se encontró el nombre del taller.");
        }
  
        setNombreTaller(`${nombreTallerEncontrado} - ${tipoTaller}`);
  
        setMatricula(alumnoData.matricula_alumno);
        setNombre(alumnoData.nombre);
        setApellidoPaterno(alumnoData.apellido_paterno);
        setApellidoMaterno(alumnoData.apellido_materno);
  
        // Concatenar nombre y apellidos
        setNombreCompleto(`${alumnoData.nombre} ${alumnoData.apellido_paterno} ${alumnoData.apellido_materno}`);
  
        setTallerData(subgrupoData);
        setPeriodoEscolar(subgrupoData.periodo_escolar);
        setTurnoTaller(subgrupoData.turno_taller);
        setHorario(`${subgrupoData.hora_inicio_12h} - ${subgrupoData.hora_final_12h}`);
        setDiasTaller(subgrupoData.dias_taller);
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage(error instanceof Error ? error.message : "Ocurrió un error al cargar los datos del taller.");
        setShowAlert(true);
      }
    };
  
    fetchTallerData();
  }, [location.state]);
  

  useEffect(() => {
    setNombreCompleto(`${nombre} ${apellidoPaterno} ${apellidoMaterno}`);
  }, [nombre, apellidoPaterno, apellidoMaterno]);

  const handleRegistrarClick = async () => {
    if (!matricula || matricula.length !== 8 || !/^\d+$/.test(matricula)) {
      setAlertSeverity("error");
      setAlertMessage("La matrícula debe tener exactamente 8 dígitos numéricos.");
      setShowAlert(true);
      return;
    }

    if (!nombre || !apellidoPaterno || !apellidoMaterno) {
      setAlertSeverity("error");
      setAlertMessage("Debe completar todos los campos obligatorios.");
      setShowAlert(true);
      return;
    }

    if (!tallerData || !tallerData.id_taller_registro) {
      setAlertSeverity("error");
      setAlertMessage("El ID del taller no está disponible.");
      setShowAlert(true);
      return;
    }

    const inscripcionData = {
      id_alumno: 5,  // ID de alumno fijo bro
      id_taller_registro: tallerData.id_taller_registro,  
      estatus: "En progreso",  // Recuerda que el estatus siempre es "En progreso" cuando un alumno nuevo se inscribe
    };

    try {
      const response = await fetch("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inscripcionData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la inscripción.");
      }

      setAlertSeverity("success");
      setAlertMessage("¡Inscripción realizada con éxito!");
      setShowAlert(true);

      setTimeout(() => navigate("/HomeAlumno"), 2000);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error instanceof Error ? error.message : "Ocurrió un error al registrar la inscripción.");
      setShowAlert(true);
    }
  };


  return (
    <div className ={`${style['home-container']}`}>
      <main className ={`${style['main-content']}`}>
      <section className ={`${style['table-section']}`}>
      <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        {/* <h1 className={style["name"]}>INSCRIPCIONES</h1> */}
        <div className={`${style['alert-name']}`}>
          <ComponentAlert
            open={showAlert}
            severity={alertSeverity}
            message={alertMessage}
            sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}
          />

        </div>
      </div>

      <div>
        <div className={style["header-data"]}>
          <div className={style["register"]}>
            <h1 className={style["list"]}>Verifica que los datos sean correctos</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
        
        <div className={`${style['datos_seccion1']}`}>
        <div className ={`${style['data-matricula']}`}>

              <Input
          label="Matrícula"
          value={matricula}
          onChange={(value) => setMatricula(value)}
           disabled={true} 
           size="xxsmall"
              />
              
              <div>
               
              </div>

          </div>
            
          <div className={`${style['nombre']}`}>
<Input
          label="Nombre Completo"
          value={nombreCompleto}
          onChange={(value) => {
            const partes = value.split(" ");
            setNombre(partes[0] || "");
            setApellidoPaterno(partes[1] || "");
            setApellidoMaterno(partes[2] || "");
          }}
          disabled={true} 
size="xxmedium"
        />
              <div>
               
              </div>
            </div>

            <div className={`${style['taller']}`}>
            <Input
            label="Nombre del Taller"
            value={nombreTaller}
            onChange={(value) => setNombreTaller(value)}
            disabled={true}
size="small"
          />
                
              </div>



              <div className={`${style['periodo-escolar']}`}>
              <Input
            label="Periodo Escolar"
            value={periodoEscolar}
            onChange={(value) => setPeriodoEscolar(value)}
            disabled={true} 
            size="xsmall"
          />
   
              </div>

          <div className={style['turno']}>
          <Input
  label="Turno y Horario"
  value={`${turnoTaller} - ${horario}`} 
  onChange={(value) => {
    const [nuevoTurno, nuevoHorario] = value.split(" - "); 
    setTurnoTaller(nuevoTurno || ""); 
    setHorario(nuevoHorario || "");  
  }}
  disabled={true} 
  size="xmedium"
/>
            </div>
           
            {/* <div className={`${style['horario']}`}>
            <Input
            label="Horario"
            value={horario}
            onChange={(value) => setHorario(value)}
            disabled={true} 
            size="xsmall"
          />

              </div> */}


              
              <div className={`${style['dias']}`}>
              <Input
            label="Días del taller"
            value={diasTaller}
            onChange={(value) => setDiasTaller(value)}
            disabled={true} 
            size="xmedium"
          />

              </div>
              

              </div>

          <div className={style["button"]}>
            <div className={style["buttons"]}>
            <ButtonRegistro
             onClick={handleRegistrarClick} label="Inscribirse"/>
              <ButtonRegistro
                onClick={() => {
                  navigate("/HomeAlumno");
                  console.log("presionado");
                }}
                label="Atrás"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>


        </section>
      </main>
    </div>
  );
};

export default FormInscripcionAlumno;
