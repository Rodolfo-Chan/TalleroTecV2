import { useState } from "react";
import style from "../from-profesores-registro/from-profesores.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input-Radio/InputRadio";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";

const FromProfesoresRegistro = () => {
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

  const handleRegistrarClick = () => {
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
      setAlertMessage("Usuario registrado con éxito.");
      setShowAlert(true);
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setTelefono("");
      setCorreo("");
      setGenero("");
      setTipo("");
      setEstatus("");
    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>PROFESORES</h1>
        <div className ={`${style['alert-name']}`}>
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
            <h1 className={style["list"]}>Ingrese datos del profesor</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
                  <div className ={`${style['nombre']}`}>
                    <Input
                      label="Nombre(s)"
                      value={nombre}
                      onChange={setNombre}
                      placeHolder="Ingrese el nombre(s)"
                      size="small"
                    />
                    <div>
                    {nombreError && (
                      <ComponentAlert open={!!nombreError} severity="error" message={nombreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}  />
                    )}
                    </div>
                  </div>

                  <div className ={`${style['apellido_paterno']}`}>
                    <Input
                      label="Apellido Paterno"
                      value={apellidopaterno}
                      onChange={setApellidoPaterno}
                      placeHolder="Ingrese el apellido paterno"
                      size="small"
                    />
                    <div>
                      {apellidopaternoError && (
                        <ComponentAlert open={!!apellidopaternoError} severity="error" message={apellidopaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                      )}
                    </div>
                </div>

                <div className ={`${style['apellido_materno']}`}>
                    <Input
                      label="Apellido Materno"
                      value={apellidomaterno}
                      onChange={setApellidoMaterno}
                      placeHolder="Ingrese el apellido materno"
                      size="small"
                    />
                    <div>
                      {apellidomaternoError && (
                        <ComponentAlert open={!!apellidomaternoError} severity="error" message={apellidomaternoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                      )}
                    </div>
                </div>

                
               <div className={style["genero"]}>
                  <InputRadio
                    label="Género"
                    value={genero}
                    option1="Masculino"
                    option2="Femenino"
                    onChange={setGenero}
                    />
                    {generoError && (
                      <ComponentAlert open={!!generoError} severity="error" message={generoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                    )}
                </div>
          
              
          </div>
       
          <div className={style["datos_seccion2"]}>
           
          
              <div className ={`${style['correo']}`}>
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
        


              <div className ={`${style['telefono']}`}>
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
                  console.log("presionado");
                  handleRegistrarClick();
                }}
                label="Registrar"
              />
              <ButtonRegistro
                onClick={() => {
                  navigate("/Profesores");
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
export default FromProfesoresRegistro;
