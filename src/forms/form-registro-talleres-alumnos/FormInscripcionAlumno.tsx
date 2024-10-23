// import React from 'react';
// import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import style from "../form-registro-talleres-alumnos/form-incripcion-alumno.module.css";
// import Button from '../../components/Button/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import style from "./from-inscripciones-registro.module.css";
import ButtonRegistro from "../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../components/Input/Input";
// import Inputbusqueda from "../../components/Input-Busqueda/Inputbusqueda";
// import Select from "../../components/Select/Select";
import ComponentAlert from "../../components/Alert/ComponentAlert";

// type AlumnoData = {
//   nombre: string;
//   apellidopaterno: string;
//   apellidomaterno: string;
// };

// const obtenerDatosAlumno = (matricula: string): AlumnoData | null => {
//   const datosAlumnos: { [key: string]: AlumnoData } = {
//     "12345678": { nombre: "Juan", apellidopaterno: "Pérez", apellidomaterno: "López" },
//     "87654321": { nombre: "María", apellidopaterno: "González", apellidomaterno: "Hernández" }
//   };

//   return datosAlumnos[matricula] || null; 
// };

const FormInscripcionAlumno: React.FC = () => {

  
  const [matricula, setMatricula] = useState("");
  const [turno, setTurno] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidoPaterno] = useState("");
  const [apellidomaterno, setApellidoMaterno] = useState("");
  const [taller, setTaller] = useState("");
  const [tipotaller, setTipoTaller] = useState("");
  const [periodoescolar, setPeriodoEscolar] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [matriculaError, setMatriculaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidopaternoError, setApellidoPaternoError] = useState("");
  const [apellidomaternoError, setApellidoMaternoError] = useState("");
  const [turnoError, setTurnoError] = useState("");

  const [tipotallerError, setTipoTallerError] = useState("");
  const [tallerError, setTallerError] = useState("");
  const [periodoescolarError, setPeriodoEscolarError] = useState("");
  const navigate = useNavigate();


 // Validación de la matrícula en tiempo real
// const handleMatriculaChange = (value: string) => {
//  setMatricula(value);

  // Validar que la matrícula tenga solo números y sea de 8 dígitos
 // if (!value) {
    // setMatriculaError("Ingrese matrícula.");
    // setNombre(""); // Vaciar campos de nombre
    // setApellidoPaterno(""); // Vaciar campos de apellido paterno
    // setApellidoMaterno(""); // Vaciar campos de apellido materno
//   } else if (!/^\d+$/.test(value)) {
//     setMatriculaError("Ingrese dígitos numéricos.");
//     setNombre(""); // Vaciar campos de nombre
//     setApellidoPaterno(""); // Vaciar campos de apellido paterno
//     setApellidoMaterno(""); // Vaciar campos de apellido materno
//   } else if (value.length !== 8) {
//     setMatriculaError("La matricula es de 8 digitos.");
//     setNombre(""); // Vaciar campos de nombre
//     setApellidoPaterno(""); // Vaciar campos de apellido paterno
//     setApellidoMaterno(""); // Vaciar campos de apellido materno
//   } else {
//     // Si la matrícula es válida, buscar los datos del alumno
//     const datosAlumno = obtenerDatosAlumno(value);
//     if (datosAlumno) {
//       setNombre(datosAlumno.nombre);
//       setApellidoPaterno(datosAlumno.apellidopaterno);
//       setApellidoMaterno(datosAlumno.apellidomaterno);
//       setMatriculaError(""); // Desactivar errores si es válida
//       setShowAlert(false);
//     } else {
//       // Mostrar un mensaje si la matrícula no está registrada
//       setMatriculaError("Esta matrícula no existe.");
//       setNombre(""); // Vaciar campos de nombre
//       setApellidoPaterno(""); // Vaciar campos de apellido paterno
//       setApellidoMaterno(""); // Vaciar campos de apellido materno
//     }
//   }
// };

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setMatriculaError("");
    setNombreError("");
    setTurnoError("");
    setApellidoPaternoError("");
    setApellidoMaternoError("");
    setTipoTallerError("");
    setTallerError("");
    setPeriodoEscolarError("");

    // if (!matricula) {
    //   setMatriculaError("Ingrese matricula");
    //   isValid = false;
    // } else if (!matricula.match(/^\d+$/)) {
    //   setMatriculaError("Ingrese dígitos numéricos.");
    //   isValid = false;
    // } else if (matricula.length !== 8) {
    //   setMatriculaError("La matricula es de 8 digitos");
    //   isValid = false;
    // }
    if (!matricula) {
      setMatriculaError("Ingrese matricula.");
      isValid = false;
    } else if (!matricula.match(/^\d+$/)) {
      setMatriculaError("Ingrese dígitos numéricos.");
      isValid = false;
    } else if (matricula.length !== 8) {
      setMatriculaError("Ingrese los 8 dígitos de la matricula.");
      isValid = false;
    }
    if (!nombre) {
      setNombreError("Ingrese nombre(s).");
      isValid = false;
    } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setNombreError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!turno) {
      setTurnoError("Seleccione turno.");
      isValid = false;
    }
    if (!turno) {
      setTurnoError("Ingrese turno.");
      isValid = false;
    } else if (!turno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setTurnoError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!apellidopaterno) {
      setApellidoPaternoError("Ingrese apellido paterno.");
      isValid = false;
    } else if (!apellidopaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoPaternoError("No se aceptan dígitos nuricos.");
      isValid = false;
    }
    if (!apellidomaterno) {
      setApellidoMaternoError("Ingrese apellido materno.");
      isValid = false;
    } else if (!apellidomaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoMaternoError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!tipotaller) {
      setTipoTallerError("Ingrese tipo taller.");
      isValid = false;
    } else if (!tipotaller.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setTipoTallerError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!taller) {
      setTallerError("Ingrese tipo taller.");
      isValid = false;
    } else if (!taller.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setTallerError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    
    if (!periodoescolar) {
      setPeriodoEscolarError("Seleccione periodo.");
      isValid = false;
    }

    if ( !matricula || !turno || !tipotaller || !nombre || !apellidopaterno || !apellidomaterno  || !taller || !periodoescolar) {
      setAlertSeverity("error");
      setAlertMessage("Los campos no concuerdan.");
      setShowAlert(true);
    } else if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
    } else {
      setAlertSeverity("success");
      setAlertMessage("Inscripción  registrado con éxito.");
      setShowAlert(true);
      setMatricula("");
      setTurno("");

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setTipoTaller("");
      setTaller("");
      setPeriodoEscolar("");
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
        {/* <Inputbusqueda
              label="Matrícula"
              value={matricula}
              onChange={handleMatriculaChange} // Validar en tiempo real
              placeHolder="Ingrese la matrícula"
              size="xsmall"
              onEnterPress={handleRegistrarClick}
            /> */}
              <Input
                label="Matricula"
                value={matricula}
                onChange={setMatricula}
                placeHolder="Matricula del alumno"
                size="xsmall"
                // disabled={false} // Deshabilitar el input
              />
              <div>
                {matriculaError && (
                  <ComponentAlert open={!!matriculaError} severity="error" message={matriculaError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

          </div>
            
          <div className={`${style['nombre']}`}>
              <Input
                label="Nombre(s)"
                value={nombre}
                onChange={setNombre}
                placeHolder="Nombre(s) del alumno"
                size="small"
              // disabled={false} // Deshabilitar el input
              />
              <div>
                {nombreError && (
                  <ComponentAlert open={!!nombreError} severity="error" message={nombreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>
            </div>

            <div className={`${style['apellido_paterno']}`}>
              <Input
                label="Apellido Paterno"
                value={apellidopaterno}
                onChange={setApellidoPaterno}
                placeHolder="Apellido Paterno"
                size="small"
               // disabled={true} // Deshabilitar el input

              />
              <div>
                {apellidopaternoError && (
                  <ComponentAlert open={!!apellidopaternoError} severity="error" message={apellidopaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>
            </div>
        
            <div className={`${style['apellido_materno']}`}>
              <Input
                label="Apellido Materno"
                value={apellidomaterno}
                onChange={setApellidoMaterno}
                placeHolder="Apellido Materno"
                size="small"
               // disabled={true} // Deshabilitar el input

              />
              <div>
                {apellidomaternoError && (
                  <ComponentAlert open={!!apellidomaternoError} severity="error" message={apellidomaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>
            </div>
 

      

          
            <div className={`${style['taller']}`}>
              <Input
                label="Taller"
                value={taller}
                onChange={setTaller}
                placeHolder="Nombre del taller"
                size="small"
              // disabled={false} // Deshabilitar el input
              />
                {tallerError && (
                  <ComponentAlert open={!!tallerError} severity="error" message={tallerError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>


          <div className={style['turno']}>
              <Input
                label="Turno del taller"
                value={turno}
                onChange={setTurno}
                placeHolder="Turno del taller"
                size="xsmall"
              // disabled={false} // Deshabilitar el input
              />
              {turnoError && (
                <ComponentAlert open={!!turnoError} severity="error" message={turnoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
              )}
            </div>

            <div className={`${style['estatus']}`}>
              <Input
                label="Tipo taller"
                value={tipotaller}
                onChange={setTipoTaller}
                placeHolder="Seleccione el estado"
                size="xsmall"
              // disabled={false} // Deshabilitar el input
              />
                 {tipotallerError && (
                  <ComponentAlert open={!!tipotallerError} severity="error" message={tipotallerError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )} 
              </div>


              <div className={`${style['periodo-escolar']}`}>
                              <Input
                label="Periodo escolar"
                value={periodoescolar}
                onChange={setPeriodoEscolar}
                placeHolder="Periodo escolar"
                size="small"
              // disabled={false} // Deshabilitar el input
              />
                 {periodoescolarError && (
                  <ComponentAlert open={!!periodoescolarError} severity="error" message={periodoescolarError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )} 
              </div>
              

              </div>

          <div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro
                onClick={() => {
                  console.log("presionado");
                  handleRegistrarClick();
                }}
                label="Inscribirse"
              />
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