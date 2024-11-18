import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./from-talleres_crear-actualizar.module.css";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import ComponentAlert from "../../../components/Alert/ComponentAlert";

const FormTalleresCrearActualizar = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [nombretaller, setNombreTaller] = useState<string>('');
  const [estatus, setEstatus] = useState<string>('');  // Mantenerlo como string por ahora
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    nombretaller: '',
    estatus: '',
  });

  useEffect(() => {
    // Cargar datos existentes del taller
    const fetchTallerData = async () => {
      try {
        const response = await axios.get(`https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/${userId}/`);
        const { nombre_taller, estatus_taller } = response.data;
        setNombreTaller(nombre_taller);
        
        // Asegúrate de que el estatus cargado sea correcto
        setEstatus(estatus_taller === true ? "Activo" : "Inactivo");  // Asignar como "Activo" o "Inactivo"
      } catch (error) {
        console.error("Error al cargar los datos del taller:", error);
        setAlertSeverity("error");
        setAlertMessage("Error al cargar los datos del taller.");
        setShowAlert(true);
      }
    };

    if (userId) {
      fetchTallerData();
    }
  }, [userId]);

  const handleActualizarClick = async () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validaciones de cada campo
    if (!nombretaller) {
      newErrors.nombretaller = "Ingrese el nombre del taller.";
      isValid = false;
    } else if (!nombretaller.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      newErrors.nombretaller = "No se aceptan dígitos numéricos.";
      isValid = false;
    }

    if (estatus === null || estatus === undefined) {
      newErrors.estatus = "Seleccione un estatus.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setAlertSeverity("error");
      setAlertMessage("Por favor complete todos los campos correctamente.");
      setShowAlert(true);
      return;
    }

    // Convertir el estatus en booleano antes de enviarlo
    const updatedTaller = {
      nombre_taller: nombretaller,
      estatus_taller: estatus === "Activo",  // Convertir "Activo" a true, "Inactivo" a false
    };

    console.log("Datos enviados al servidor:", updatedTaller); // Verifica el formato de los datos

    try {
      const response = await axios.put(`https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/${userId}/`, updatedTaller);
      if (response.status === 200 || response.status === 204) {
        setAlertSeverity("success");
        setAlertMessage("Taller actualizado con éxito.");
        setShowAlert(true);
      } else {
        setAlertSeverity("warning");
        setAlertMessage("No se pudo actualizar el taller. Intente nuevamente.");
        setShowAlert(true);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error al actualizar el taller:", error.response.data);
        setAlertMessage(`Error: ${error.response.data.estatus_taller ? error.response.data.estatus_taller[0] : "Error al actualizar el taller."}`);
      } else {
        console.error("Error:", error.message);
        setAlertMessage("Error al actualizar el taller.");
      }
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>ACTUALIZAR TALLER</h1>
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
                label="Nombre del Taller"
                value={nombretaller}
                onChange={(value) => setNombreTaller(value)}
                placeHolder="Ingrese el nombre del taller"
                size="small"
              />
              {errors.nombretaller && (
                <ComponentAlert
                  open={!!errors.nombretaller}
                  severity="error"
                  message={errors.nombretaller}
                  sx={{ width: 'auto', height: 'auto', fontSize: '12px' }}
                />
              )}
            </div>

            <div className={`${style['estatus_taller']}`}>
              <Select
                label="Estatus del Taller"
                value={estatus}
                onChange={(value) => setEstatus(value as string)}
                options={[
                  { value: "Activo", label: "Activo" },
                  { value: "Inactivo", label: "Inactivo" },
                ]}
                placeholder="Seleccione un estatus"
                size="xsmall"
              />
              {errors.estatus && (
                <ComponentAlert
                  open={!!errors.estatus}
                  severity="error"
                  message={errors.estatus}
                  sx={{ width: 'auto', height: 'auto', fontSize: '12px' }}
                />
              )}
            </div>
          </div>

          {/* Si tienes más secciones, puedes agregarlas aquí */}

          <div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro
                onClick={handleActualizarClick}
                label="Actualizar"
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

export default FormTalleresCrearActualizar;
