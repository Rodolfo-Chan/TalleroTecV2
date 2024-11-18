import { useState } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import style from "./from-talleres_crear-registro.module.css";
import axios from "axios";

const FormTalleresCrearRegistro = () => {
  const [nombretaller, setNombreTaller] = useState<string>('');
  const [estatus, setEstatus] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    nombretaller: '',
    estatus: '',
  });

  const navigate = useNavigate();

  const checkExistingData = async () => {
    try {
      const response = await axios.get('https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/', {
        params: {
          nombre_taller: nombretaller
        }
      });
      const existingData = response.data;

      const newErrors: { [key: string]: string } = { ...errors };
      let errorFound = false;

      if (existingData.some((item: any) => item.nombre_taller === nombretaller)) {
        newErrors.nombretaller = "Este taller ya existe.";
        errorFound = true;
      }

      setErrors(newErrors);
      return errorFound;
    } catch (error) {
      console.error("Error al verificar datos existentes:", error);
      return false;
    }
  };

  const handleRegistrarClick = async () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validaciones de cada campo
    if (!nombretaller) {
      newErrors.nombretaller = "Ingrese nombre(s).";
      isValid = false;
    } else if (!nombretaller.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      newErrors.nombretaller = "No se aceptan dígitos numéricos.";
      isValid = false;
    }

    if (!estatus) {
      newErrors.estatus = "Seleccione un estatus.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setAlertSeverity("error");
      setAlertMessage("Por favor complete todos los campos.");
      setShowAlert(true);
      return;
    }

    const exists = await checkExistingData();
    if (exists) {
      setAlertSeverity("warning");
      setAlertMessage("Este taller ya existe.");
      setShowAlert(true);
      return;
    }

    // Convertir el estatus a un valor booleano
    const estatusBoolean = estatus === "Activo" ? true : false;

    const nuevoTaller = {
      nombre_taller: nombretaller,
      estatus_taller: estatusBoolean,  // Se envía un valor booleano
    };

    axios.post('https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/', nuevoTaller)
      .then(() => {
        // Imprimir en consola los datos guardados
        console.log("Datos guardados:", nuevoTaller);

        setAlertSeverity("success");
        setAlertMessage("Taller registrado con éxito.");
        setShowAlert(true);

        // Limpiar los campos después del registro
        setNombreTaller('');
        setEstatus('');
        setErrors({
          nombretaller: '',
          estatus: '',
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error al registrar alumno:", error.response.data);
          setAlertMessage(`Error: ${error.response.data.message || "Error al registrar el taller."}`);
        } else {
          console.error("Error:", error.message);
          setAlertMessage("Error al registrar el taller.");
        }
        setAlertSeverity("error");
        setShowAlert(true);
      });
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
              <Input label="Nombre taller"
                value={nombretaller}
                onChange={(value) => setNombreTaller(value)}
                placeHolder="Ingrese el nombre del taller"
                size="small" />
              {errors.nombretaller && <ComponentAlert open={!!errors.nombretaller} severity="error" message={errors.nombretaller} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            </div>

            <div className={`${style['estatus_taller']}`}>
              <Select
                label="Estatus taller"
                value={estatus}
                onChange={(value) => setEstatus(value as string)}
                options={[
                  { value: "Activo", label: "Activo" },
                  { value: "Inactivo", label: "Inactivo" },
                ]}
                placeholder="Seleccione un estatus"
                size="xsmall"
              />
              {errors.estatus && <ComponentAlert open={!!errors.estatus} severity="error" message={errors.estatus} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
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
