import { useState, useEffect } from "react";
import style from "../from-alumnos-actualizar/from-alumnos-actualizar.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input-Radio/InputRadio";
import { useNavigate, useParams } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import Select from "../../../components/Select/Select";


const FromAlumnosActualizar = () => {
  const { userId } = useParams();
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidoPaterno] = useState("");
  const [apellidomaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [matriculaError, setMatriculaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidopaternoError, setApellidoPaternoError] = useState("");
  const [apellidomaternoError, setApellidoMaternoError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [generoError, setGeneroError] = useState("");
  const [carreraError, setCarreraError] = useState("");
  const [semestreError, setSemestreError] = useState("");
  const navigate = useNavigate();

  const usuarios = [
    {
      id:1,
      Matricula: "20890344",
      Nombre: "Juan Sanchez",
      "Apellido Paterno": "Perez",
      "Apellido Materno": "Ancona",
      Telefono: "1234567890",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Semestre:"4°",
    },
    {
      id:2,
      Matricula: "67836325",
      Nombre: "Alberto Antonio",
      "Apellido Paterno": "Puc",
      "Apellido Materno": "Santos",
      Telefono: "9872561528",
      Genero: "Masculino",
      Carrera: "LIC. Administracion",
      Semestre:"4°",
    },
    {
      id:3,
      Matricula: "22367534",
      Nombre: "Juan Sanchez",
      "Apellido Paterno": "Perez",
      "Apellido Materno": "Ancona",
      Telefono: "1234567890",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Semestre:"4°",
    },
    {
      id:4,
      Matricula: "45678976",
      Nombre: "Saul Antonio",
      "Apellido Paterno": "Ake",
      "Apellido Materno": "Baas",
      Telefono: "8972628910",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Semestre:"6°",
    },
    {
      id:5,
      Matricula: "91452678",
      Nombre: "Andrea Cecilia",
      "Apellido Paterno": "Ramirez",
      "Apellido Materno": "Nauat",
      Telefono: "1234567890",
      Genero: "Femenino",
      Carrera: "ING. Informatica",
      Semestre:"4°",
    },
    {
      id:6,
      Matricula: "81035276",
      Nombre: "Maria Jose",
      "Apellido Paterno": "Cime",
      "Apellido Materno": "Pech",
      Telefono: "1123098160",
      Genero: "Femenino",
      Carrera: "ING. Agronomia",
      Semestre:"7°",
    },
    {
      id:7,
      Matricula: "09362784",
      Nombre: "Cesar Guzman",
      "Apellido Paterno": "Noh",
      "Apellido Materno": "Sanchez",
      Telefono: "1234234509",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Semestre:"4°",
    },
    {
      id:8,
      Matricula: "26254628",
      Nombre: "Dalia Rosario",
      "Apellido Paterno": "May",
      "Apellido Materno": "Cupul",
      Telefono: "1715431098",
      Genero: "Femenino",
      Carrera: "ING. Informatica",
      Semestre:"4°",
    }
  ];

  useEffect(() => {
    const usuario = usuarios.find(user => user.id === parseInt(userId as string));
    if (usuario) {
      setMatricula(usuario.Matricula);
      setNombre(usuario.Nombre);
      setApellidoPaterno(usuario["Apellido Paterno"]);
      setApellidoMaterno(usuario["Apellido Materno"]);
      setTelefono(usuario.Telefono);
      setGenero(usuario.Genero);
      setCarrera(usuario.Carrera);
      setSemestre(usuario.Semestre);
    } else {
      console.error("Usuario no encontrado");
    }
  }, [userId, usuarios]);

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setMatricula("");
    setNombreError("");
    setApellidoPaternoError("");
    setApellidoMaternoError("");
    setTelefonoError("");
    setGeneroError("");
    setCarreraError("");
    setSemestreError("");

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
    if (!apellidopaterno) {
      setApellidoPaternoError("Ingrese apellido paterno.");
      isValid = false;
    } else if (!apellidopaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoPaternoError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!apellidomaterno) {
      setApellidoMaternoError("Ingrese apellido materno.");
      isValid = false;
    } else if (!apellidomaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setApellidoMaternoError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!telefono) {
      setTelefonoError("Ingrese Num telefónico.");
      isValid = false;
    } else if (!telefono.match(/^\d+$/)) {
      setTelefonoError("Solo se aceptan dígitos numéricos.");
      isValid = false;
    } else if (telefono.length !== 10) {
      setTelefonoError("El teléfono debe contener 10 dígitos.");
      isValid = false;
    }
    if (!genero) {
      setGeneroError("Seleccione un género.");
      isValid = false;
    }
    if (!carrera) {
      setCarreraError("Seleccione carrera.");
      isValid = false;
    }
    if (!semestre) {
      setSemestreError("Seleccione semestre.");
      isValid = false;
    }

    if (!matricula || !nombre || !apellidopaterno || !apellidomaterno || !telefono || !genero || !carrera || !semestre) {
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
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setTelefono("");
      setGenero("");
      setCarrera("");
      setSemestre("");
    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>ALUMNOS</h1>
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
            <h1 className={style["list"]}>Actualizar datos del alumno</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
         
        <div className={`${style['datos_seccion1']}`}>
          <div className ={`${style['matricula']}`}>
          <Input
                label="Matrícula"
                value={matricula}
                onChange={setMatricula}
                placeHolder="Matrícula"
                size="xsmall"
              />
              <div>
                {matriculaError && (
                  <ComponentAlert open={!!matriculaError} severity="error" message={matriculaError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>
          </div>
            
          <div className={`${style['nombre']}`}>
              <Input
                label="Nombre(s)"
                value={nombre}
                onChange={setNombre}
                placeHolder="Nombre"
                size="small"
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
                placeHolder="Ingrese el apellido paterno"
                size="small"
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
                placeHolder="Ingrese el apellido materno"
                size="small"
              />
              <div>
                {apellidomaternoError && (
                  <ComponentAlert open={!!apellidomaternoError} severity="error" message={apellidomaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>
            </div>

            </div>
         
          <div className={style["datos_seccion2"]}>
           
          <div className={style["genero"]}>
                  <InputRadio
                    label="Género"
                    value={genero}
                    option1="Masculino"
                    option2="Femenino"
                    onChange={setGenero}
                  />
                  {generoError && (
                    <ComponentAlert open={!!generoError} severity="error" message={generoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                  )}
                </div>

                <div className={`${style['telefono']}`}>
                <Input
                  label="Número Telefonico"
                  value={telefono}
                  onChange={setTelefono}
                  placeHolder="Ingrese el número telefónico"
                  size="small"
                />
                {telefonoError && (
                  <ComponentAlert open={!!telefonoError} severity="error" message={telefonoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>

              <div className={`${style['carrera']}`}>
                <Select
                  label="Carrera"
                  value={carrera}
                  onChange={setCarrera}
                  options={["ING.Informatica", "ING.Gest.Emp","ING.Agronomia", "LIC.Biologia", "LIC.Administración"]}
                  placeholder="Seleccione una cerrera"
                  size="small"
                />
                
                {carreraError && (
                  <ComponentAlert open={!!carreraError} severity="error" message={carreraError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
                )}
              </div>

      
              <div className={`${style['semestre']}`}>
                <Select
                  label="Semestre"
                  value={semestre}
                  onChange={setSemestre}
                  options={["1 Semestre", "2 Semestre", "3 Semestre", "4 Semestre", "5 Semestre", "6 Semestre", "7 Semestre", "8 Semestre", "9 Semestre"]}
                  placeholder="Seleccione un semestre"
                  size="small"
              
                />
                {semestreError && (
                  <ComponentAlert open={!!semestreError} severity="error" message={semestreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                  navigate("/Alumnos");
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

export default FromAlumnosActualizar;
