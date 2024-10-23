import { useState } from "react";
import style from "./from-inscripciones-registro.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Inputbusqueda from "../../../components/Input-Busqueda/Inputbusqueda";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";


type AlumnoData = {
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
};

const obtenerDatosAlumno = (matricula: string): AlumnoData | null => {
  const datosAlumnos: { [key: string]: AlumnoData } = {
    "12345678": { nombre: "Juan", apellidopaterno: "Pérez", apellidomaterno: "López" },
    "87654321": { nombre: "María", apellidopaterno: "González", apellidomaterno: "Hernández" }
  };

  return datosAlumnos[matricula] || null; 
};

const FormInscripcionesRegistro = () => {
  
  const [matricula, setMatricula] = useState("");
  const [turno, setTurno] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidoPaterno] = useState("");
  const [apellidomaterno, setApellidoMaterno] = useState("");
  const [taller, setTaller] = useState("");
  const [estatus, setEstatus] = useState("");
  const [periodoescolar, setPeriodoEscolar] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [matriculaError, setMatriculaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidopaternoError, setApellidoPaternoError] = useState("");
  const [apellidomaternoError, setApellidoMaternoError] = useState("");
  const [turnoError, setTurnoError] = useState("");

  const [estatusError, setEstatusError] = useState("");
  const [tallerError, setTallerError] = useState("");
  const [periodoescolarError, setPeriodoEscolarError] = useState("");
  const navigate = useNavigate();


 // Validación de la matrícula en tiempo real
 const handleMatriculaChange = (value: string) => {
  setMatricula(value);

  // Validar que la matrícula tenga solo números y sea de 8 dígitos
  if (!value) {
    setMatriculaError("Ingrese matrícula.");
    setNombre(""); // Vaciar campos de nombre
    setApellidoPaterno(""); // Vaciar campos de apellido paterno
    setApellidoMaterno(""); // Vaciar campos de apellido materno
  } else if (!/^\d+$/.test(value)) {
    setMatriculaError("Ingrese dígitos numéricos.");
    setNombre(""); // Vaciar campos de nombre
    setApellidoPaterno(""); // Vaciar campos de apellido paterno
    setApellidoMaterno(""); // Vaciar campos de apellido materno
  } else if (value.length !== 8) {
    setMatriculaError("La matricula es de 8 digitos.");
    setNombre(""); // Vaciar campos de nombre
    setApellidoPaterno(""); // Vaciar campos de apellido paterno
    setApellidoMaterno(""); // Vaciar campos de apellido materno
  } else {
    // Si la matrícula es válida, buscar los datos del alumno
    const datosAlumno = obtenerDatosAlumno(value);
    if (datosAlumno) {
      setNombre(datosAlumno.nombre);
      setApellidoPaterno(datosAlumno.apellidopaterno);
      setApellidoMaterno(datosAlumno.apellidomaterno);
      setMatriculaError(""); // Desactivar errores si es válida
      setShowAlert(false);
    } else {
      // Mostrar un mensaje si la matrícula no está registrada
      setMatriculaError("Esta matrícula no existe.");
      setNombre(""); // Vaciar campos de nombre
      setApellidoPaterno(""); // Vaciar campos de apellido paterno
      setApellidoMaterno(""); // Vaciar campos de apellido materno
    }
  }
};

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setMatriculaError("");
    setNombreError("");
    setTurnoError("");
    setApellidoPaternoError("");
    setApellidoMaternoError("");
    setEstatusError("");
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
    if (!nombre) {
      setNombreError("Ingrese la matrícula.");
      isValid = false;
    } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setNombreError("Solo se aceptan letras minusculas y mayusculas.");
      isValid = false;
    }
    if (!turno) {
      setTurnoError("Seleccione turno.");
      isValid = false;
    }
    if (!apellidopaterno) {
      setApellidoPaternoError("Ingrese la matrícula.");
      isValid = false;
    }else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoPaternoError("Solo se aceptan letras minusculas y mayusculas.");
      isValid = false;
    }
    if (!apellidomaterno) {
      setApellidoMaternoError("Ingrese la matrícula.");
      isValid = false;
    }
    else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoMaternoError("Solo se aceptan letras minusculas y mayusculas.");
      isValid = false;
    }
    if (!estatus) {
      setEstatusError("Seleccione estatus.");
      isValid = false;
    }
    if (!taller) {
      setTallerError("Seleccione taller.");
      isValid = false;
    }
    if (!periodoescolar) {
      setPeriodoEscolarError("Seleccione periodo.");
      isValid = false;
    }

    if ( !matricula || !turno || !estatus || !nombre || !apellidopaterno || !apellidomaterno  || !taller || !periodoescolar) {
      setAlertSeverity("error");
      setAlertMessage("Por favor complete todos los campos.");
      setShowAlert(true);
    } else if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
    } else {
      setAlertSeverity("success");
      setAlertMessage("Usuario registrado con éxito.");
      setShowAlert(true);
      setMatricula("");
      setTurno("");

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setEstatus("");
      setTaller("");
      setPeriodoEscolar("");
    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>INSCRIPCIONES</h1>
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
            <h1 className={style["list"]}>Ingrese datos de la inscripción</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
        
        <div className={`${style['datos_seccion1']}`}>
        <div className ={`${style['data-matricula']}`}>
        <Inputbusqueda
              label="Matrícula"
              value={matricula}
              onChange={handleMatriculaChange} // Validar en tiempo real
              placeHolder="Ingrese la matrícula"
              size="xsmall"
              onEnterPress={handleRegistrarClick}
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
                disabled={true} // Deshabilitar el input

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
                placeHolder="Apellidos del alumno"
                size="small"
                disabled={true} // Deshabilitar el input

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
                placeHolder="Apellidos del alumno"
                size="small"
                disabled={true} // Deshabilitar el input

              />
              <div>
                {apellidomaternoError && (
                  <ComponentAlert open={!!apellidomaternoError} severity="error" message={apellidomaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>
            </div>
 

            </div>

          
          <div className={style["datos_seccion2"]}>
           
          <div className={`${style['periodo-escolar']}`}>
                <Select
                  label="Perido escolar"
                  value={periodoescolar}
                  onChange={setPeriodoEscolar}
                  options={["ENE-JUN/2019", "JUL-NOV/2020", "ENE-JUN/2022", "ENE-JUN/2023"]}
                  placeholder="seleccione un periodo"
              size="small"
                />
                {periodoescolarError && (
                  <ComponentAlert open={!!periodoescolarError} severity="error" message={periodoescolarError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>

          <div className={style['turno']}>
              <Select
                label="Turno del taller"
                value={turno}
                onChange={setTurno}
                options={[
                  "Matutino",
                  "Vespertino"
                ]}
                placeholder="Seleccione el turno"
                size="xsmall"
              />
              {turnoError && (
                <ComponentAlert open={!!turnoError} severity="error" message={turnoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
              )}
            </div>

      
              <div className={`${style['taller']}`}>
                <Select
                  label="Taller"
                  value={taller}
                  onChange={setTaller}
                  options={["Voleibol Varonil", "Voleibol Femanil","Futbol Varonil", "Basquetbol Mixto", "Basquetbol Varonil", "Basquetbol Femenil", "Beisbol Varonil", "Beisbol Femenil", "Esport", "Lectura", "Folklore", "Batucada", "Reforestación", "Cuidado Ambiental"]}
                  placeholder="seleccione un taller"
                  size="small"
                />
                
                {tallerError && (
                  <ComponentAlert open={!!tallerError} severity="error" message={tallerError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

              <div className={`${style['estatus']}`}>
                <Select
                  label="Estatus"
                  value={estatus}
                  onChange={setEstatus}
                  options={["En progreso", "Completo","Baja"]}
                  placeholder="seleccione un estado"
                  size="xsmall"
                />
                
                {estatusError && (
                  <ComponentAlert open={!!estatusError} severity="error" message={estatusError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                label="Registrar"
              />
              <ButtonRegistro
                onClick={() => {
                  navigate("/Inscripciones");
                  console.log("presionado");
                }}
                label="Atrás"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInscripcionesRegistro;
