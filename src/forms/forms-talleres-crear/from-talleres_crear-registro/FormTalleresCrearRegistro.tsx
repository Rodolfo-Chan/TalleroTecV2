import { useState } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import style from "./from-talleres_crear-registro.module.css";


const FormTalleresCrearRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [estatus, setEstatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [estatusError, setEstatusError] = useState("");

  const navigate = useNavigate();

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setNombreError("");
    setTipoError("");
    setEstatusError("");


    if (!nombre) {
      setNombreError("Ingrese nombre(s).");
      isValid = false;
    } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setNombreError("No se aceptan dígitos numéricos.");
      isValid = false;
    }
    if (!tipo) {
      setTipoError("Seleccione un tipo.");
      isValid = false;
    }

    if (!estatus) {
      setEstatusError("Seleccione un estatus.");
      isValid = false;
    }

   

    if (!nombre || !tipo || !estatus) {
      setAlertSeverity("error");
      setAlertMessage("Por favor complete todos los campos.");
      setShowAlert(true);
    } else if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
    } else {
      setAlertSeverity("success");
      setAlertMessage("Taller registrado con éxito.");
      setShowAlert(true);
      // Reseteo de valores
      setNombre("");
      setTipo("");
      setEstatus("");


    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>CREAR TALLER</h1>
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
            <h1 className={style["list"]}>Ingrese datos del taller</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
          <div className={style['nombre-taller']}>
              <Input
                label="Nombre taller"
                value={nombre}
                onChange={setNombre}
                placeHolder="Ingrese el nombre del taller"
                size="small"
              />
              {nombreError && (
                <ComponentAlert open={!!nombreError} severity="error" message={nombreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
              )}
            </div>

          <div className={`${style['tipo_taller']}`}>
                <Select
                  label="Tipo taller"
                  value={tipo}
                  onChange={setTipo}
                  options={["Femenil", "Varonil", "Mixto"]}
                  placeholder="seleccione un tipo"
                  size="small"
                />
                
                {tipoError && (
                  <ComponentAlert open={!!tipoError} severity="error" message={tipoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>

              <div className={`${style['estatus_taller']}`}>
                <Select
                  label="Estatus taller"
                  value={estatus}
                  onChange={setEstatus}
                  options={["Activo", "Inactivo"]}
                  placeholder="seleccione un estatus"
                  size="small"
                />
                
                {estatusError && (
                  <ComponentAlert open={!!estatusError} severity="error" message={estatusError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>


      
            


          </div>





          <div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro
                onClick={handleRegistrarClick}
                label="Registrar"
              />
              <ButtonRegistro
                onClick={() => navigate("/TalleresCrear")}
                label="Atrás"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTalleresCrearRegistro;