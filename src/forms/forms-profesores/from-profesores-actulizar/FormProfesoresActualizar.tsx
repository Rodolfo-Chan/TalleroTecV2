import { useState, useEffect } from "react";
import style from "../from-profesores-actulizar/from-profesores-actualizar.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input-Radio/InputRadio";
import Select from "../../../components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";

const FromProfesoresActualizar = () => {
  const { userId } = useParams();
  const [nombre, setNombre] = useState("");
  const [apellidopaterno, setApellidoPaterno] = useState("");
  const [apellidomaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [genero, setGenero] = useState("");
  const [tipo, setTipo] = useState("");
  const [estatus, setEstatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidopaternoError, setApellidoPaternoError] = useState("");
  const [apellidomaternoError, setApellidoMaternoError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [generoError, setGeneroError] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [estatusError, setEstatusError] = useState("");
  const navigate = useNavigate();

  const usuarios = [
    {
      id:1,
      Nombre: "Juan Sanchez",
      "Apellido Paterno": "Perez",
      "Apellido Materno": "Ancona",
      Telefono: "1234567890",
      Correo: "juan.perez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:2,
      Nombre: "Maria Guadalupe",
      "Apellido Paterno": "Gonzalez",
      "Apellido Materno": "Canche",
      Telefono: "9876543210",
      Correo: "maria.gonzalez@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:3,
      Nombre: "Pedro",
      "Apellido Paterno": "Martinez",
      "Apellido Materno": "Castro",
      Telefono: "5551234567",
      Correo: "pedro.martinez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:4,
      Nombre: "Laura Guadalupe",
     "Apellido Paterno": "Lopez",
     "Apellido Materno": " Martin",
      Telefono: "4445678901",
      Correo: "laura.lopez@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {id:5,
      Nombre: "Carlos Antonio",
      "Apellido Paterno": "Sanchez",
      "Apellido Materno" : "Mena",
      Telefono: "3336789012",
      Correo: "carlos.sanchez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:6,
      Nombre: "Ana",
      "Apellido Paterno": "Rodriguez",
      "Apellido Materno": "Betancurd",
      Telefono: "2227890123",
      Correo: "ana.rodriguez@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {id:7,
      Nombre: "David Gustavo",
      "Apellido Paterno": "Hernandez",
      "Apellido Materno": "Gamboa",
      Telefono: "6668901234",
      Correo: "david.hernandez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:8,
      Nombre: "Sofia Leticia",
      "Apellido Paterno": "Diaz",
      "Apellido Materno": "Mena",
      Telefono: "7779012345",
      Correo: "sofia.diaz@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:9,
      Nombre: "Jose Eduardo",
      "Apellido Paterno": "Gomez",
      "Apellido Materno": "Cupul",
      Telefono: "8880123456",
      Correo: "eduardo.gomez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:10,
      Nombre: "Luisa Margarita",
      "Apellido Paterno": "Martínez",
      "Apellido Materno": "Noh",
      Telefono: "9991234567",
      Correo: "luisa.martinez@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:11,
      Nombre: "Javier Castro",
      "Apellido Paterno": "Fernandez",
      "Apellido Materno": "Baas",
      Telefono: "1112345678",
      Correo: "javier.fernandez@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:12,
      Nombre: "Paula Alejandra",
      "Apellido Paterno": "Ruiz",
      "Apellido Materno": " Estrella",
      Telefono: "2223456789",
      Correo: "paula.ruiz@example.com",
      Genero: "Femenino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    },
    {
      id:13,
      Nombre: "Diego Alberto",
      "Apellido Paterno": "Garcia",
      "Apellido Materno": "Canche",
      Telefono: "3334567890",
      Correo: "diego.garcia@example.com",
      Genero: "Masculino",
      Tipo:"Profesor",
      Estatus:"Inactivo"
    }
  ];

  useEffect(() => {
    const usuario = usuarios.find(user => user.id === parseInt(userId as string));
    if (usuario) {
      setNombre(usuario.Nombre);
      setApellidoPaterno(usuario["Apellido Paterno"]);
      setApellidoMaterno(usuario["Apellido Materno"]);
      setTelefono(usuario.Telefono);
      setCorreo(usuario.Correo);
      setGenero(usuario.Genero);
      setTipo(usuario.Tipo);
      setEstatus(usuario.Estatus);

    } else {
      console.error("Usuario no encontrado");
    }
  }, [userId, usuarios]);

  const handleActualizarClick = () => {
    let isValid = true;

    // Reset error messages
    setNombreError("");
    setApellidoPaternoError("");
    setApellidoMaternoError("");
    setTelefonoError("");
    setCorreoError("");
    setGeneroError("");
    setTipoError("");
    setEstatusError("");

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
    if (!correo) {
      setCorreoError("Ingrese correo electrónico.");
      isValid = false;
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
      setCorreoError("Ingrese un correo electrónico válido.");
      isValid = false;
    }
    if (!genero) {
      setGeneroError("Seleccione un género.");
      isValid = false;
    }
    if (!tipo) {
      setTipoError("Seleccione tipo.");
      isValid = false;
    }
    if (!estatus) {
      setEstatusError("Seleccione estatus.");
      isValid = false;
    }

    if (!nombre || !apellidopaterno || !apellidomaterno || !telefono || !correo || !genero || !tipo || !estatus) {
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
      console.log("Datos actualizados:", { nombre, apellidopaterno, apellidomaterno, telefono, correo, genero, tipo, estatus });
    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>PROFESORES</h1>
        <div className={style['alert-name']}>
          <ComponentAlert
            open={showAlert}
            severity={alertSeverity}
            message={alertMessage}
          />
        </div>
      </div>

      <div>
        <div className={style["header-data"]}>
          <div className={style["register"]}>
            <h1 className={style["list"]}>Actualizar datos del profesor</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
            <div className={style['nombre']}>
              <Input
                label="Nombre(s)"
                value={nombre}
                onChange={setNombre}
                placeHolder="Ingrese el nombre(s)"
                size="small"
              />
              <div>
                {nombreError && (
                  <ComponentAlert open={!!nombreError} severity="error" message={nombreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>
            </div>
            <div className ={`${style['apellido_paterno']}`}>
              <Input
                label="Apellido Paterno"
                value={apellidopaterno}
                onChange={setApellidoPaterno}
                placeHolder="Ingrese los apellidos"
                size="small"
              />
              <div>
                {apellidopaternoError && (
                  <ComponentAlert open={!!apellidopaternoError} severity="error" message={apellidopaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}  />
                )}
              </div>
            </div>

            <div className ={`${style['apellido_materno']}`}>
              <Input
                label="Apellido Materno"
                value={apellidomaterno}
                onChange={setApellidoMaterno}
                placeHolder="Ingrese los apellidos"
                size="small"
              />
              <div>
                {apellidomaternoError && (
                  <ComponentAlert open={!!apellidomaternoError} severity="error" message={apellidomaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}  />
                )}
              </div>
            </div>

            <div className ={`${style['genero']}`}>
            <div className={style["radio-container"]}>
                <InputRadio
                  label="Género"
                  value={genero}
                  option1="Masculino"
                  option2="Femenino"
                  onChange={setGenero}
                />
                {generoError && (
                  <ComponentAlert open={!!generoError} severity="error" message={generoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}  />
                )}
              </div>
              </div>

          </div>
        
          <div className={style["datos_seccion2"]}>
           
            <div className={style['correo']}>
                <Input
                  label="Correo"
                  value={correo}
                  onChange={setCorreo}
                  placeHolder="Ingrese un electrónico"
                  size="large"
                />
                {correoError && (
                  <ComponentAlert open={!!correoError} severity="error" message={correoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

              <div className={style['telefono']}>
                <Input
                  label="Número Telefonico"
                  value={telefono}
                  onChange={setTelefono}
                  placeHolder="ingrese el número telefónico"
                  size="small"
                />
                {telefonoError && (
                  <ComponentAlert open={!!telefonoError} severity="error" message={telefonoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

              <div className={`${style['tipo-profesor']}`}>
                <Select
                  label="Tipo profesor"
                  value={tipo}
                  onChange={setTipo}
                  options={["Alumno", "Profesor"]}
                  placeholder="Seleccione un tipo"
                  size="xsmall"
                />
                
                {tipoError && (
                  <ComponentAlert open={!!tipoError} severity="error" message={tipoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

              <div className={`${style['estatus-profesor']}`}>
                <Select
                  label="Estatus"
                  value={estatus}
                  onChange={setEstatus}
                  options={["Activo", "Inactivo"]}
                  placeholder="Seleccione el estatus"
                  size="xsmall"
                />
                
                {estatusError && (
                  <ComponentAlert open={!!estatusError} severity="error" message={estatusError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>
            
          </div>

          <div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro
                onClick={() => {
                  handleActualizarClick();
                }}
                label="Actualizar"
              />
              <ButtonRegistro
                onClick={() => {
                  navigate("/Profesores");
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

export default FromProfesoresActualizar;
