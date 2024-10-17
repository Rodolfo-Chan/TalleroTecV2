import { useState, useEffect } from "react";
import style from "./from-inscripciones-actualizar.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Inputbusqueda from "../../../components/Input-Busqueda/Inputbusqueda";
import Select from "../../../components/Select/Select";
import { useNavigate,useParams } from "react-router-dom";
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


const FormInscripcionesActualizar = () => {
  const { userId } = useParams();
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

  const usuarios = [
    {
      id:1,
       "Matricula Alumno": "20890344",
       "Nombre Alumno": "Juan Sanchez",
       "Apellidos Paterno": "Perez",
       "Apellidos Materno": "Ancona",
       Taller: "Softball varonil",
       "Periodo escolar": "AGO-DIC/2024",
       Turno: "Matutino",
       Estatus: "En progreso",
     },
      {
        id:2,
        "Matricula Alumno": "67836325",
        "Nombre Alumno": "Alberto Antonio",
        "Apellidos Paterno": "Puc",
        "Apellidos Materno": "Santos",
        Taller: "Ajedrez",
        "Periodo escolar": "AGO-DIC/2022",
        Turno: "Matutino",
        Estatus: "Completado",
      },
      {
       id:3,
       "Matricula Alumno": "22367534",
       "Nombre Alumno":  "Juan Sanchez",
        "Apellidos Paterno": "Perez",
        "Apellidos Materno": "Ancona",
        Taller: "Hanal-Pixan",
        "Periodo escolar": "AGO-DIC/2019",
        Turno: "Matutino",
        Estatus: "Incompleto",
      },
      {
        id:4,
        "Matricula Alumno": "45678976",
       "Nombre Alumno":  "Saul Antonio",
        "Apellidos Paterno": "Ake",
        "Apellidos Materno": "Baas",
        Taller: "Basquetball",
        "Periodo escolar": "AGO-DIC/2024",
        Turno: "Matutino",
        Estatus: "En progreso",
      },
      {
        id:5,
        "Matricula Alumno":"91452678",
       "Nombre Alumno":  "Andrea Cecilia",
        "Apellidos Paterno": "Ramirez",
        "Apellidos Materno": "Nauat",
        Taller: "Beisball",
        "Periodo escolar": "AGO-DIC/2024",
        Turno: "Matutino",
        Estatus: "En progreso",
 
      },
      {id:6,
       "Matricula Alumno": "81035276",
       "Nombre Alumno":  "Maria Jose",
        "Apellidos Paterno": "Cime",
        "Apellidos Materno": "Pech",
        Taller: "Futball Femenil",
        "Periodo escolar": "AGO-DIC/2024",
        Turno: "Matutino",
        Estatus: "En progreso",
 
      },
      {
        id:7,
        "Matricula Alumno":"09362784",
       "Nombre Alumno":  "Cesar Guzman",
        "Apellidos Paterno": "Noh",
        "Apellidos Materno": "Sanchez",
        Taller: "Ajedrez",
        "Periodo escolar": "AGO-DIC/2024",
        Turno: "Matutino",
        Estatus: "En progreso",
 
      },
      {
        id:8,
        "Matricula Alumno": "262541628",
       "Nombre Alumno":  "Dalia Rosario",
        "Apellidos Paterno": "May",
        "Apellidos Materno": "Cupul",
        Taller: "Basqueball Femenil",
        "Periodo escolar": "AGO-DIC/2024",
        Turno: "Matutino",
        Estatus: "En progreso",
      }
  ];

  useEffect(() => {
    const usuario = usuarios.find(user => user.id === parseInt(userId as string));
    if (usuario) {
      setMatricula(usuario["Matricula Alumno"]);
      setNombre(usuario["Nombre Alumno"]);
      setApellidoPaterno(usuario["Apellidos Paterno"]);
      setApellidoMaterno(usuario["Apellidos Materno"]);
      setTaller(usuario.Taller);
      setPeriodoEscolar(usuario["Periodo escolar"]);
      setTurno(usuario.Turno);
      setEstatus(usuario.Estatus);
    } else {
      console.error("Usuario no encontrado");
    }
  }, [userId, usuarios]);


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

    if (!matricula || !turno || !estatus || !nombre || !apellidopaterno || !apellidomaterno  || !taller || !periodoescolar) {
      setAlertSeverity("error");
      setAlertMessage("Por favor complete todos los campos.");
      setShowAlert(true);
    } else if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
    } else {
      setAlertSeverity("success");
      setAlertMessage("Datos actualizados con éxito.");
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
            <h1 className={style["list"]}>Actualizar datos de la inscripción</h1>
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
                  <ComponentAlert open={!!apellidopaternoError} severity="error" message={apellidopaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                  <ComponentAlert open={!!periodoescolarError} severity="error" message={periodoescolarError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
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
                  placeholder="seleccione una cerrera"
                  size="small"
                />
                
                {tallerError && (
                  <ComponentAlert open={!!tallerError} severity="error" message={tallerError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                label="Actualizar"
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
export default FormInscripcionesActualizar;
