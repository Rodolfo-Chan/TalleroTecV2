import { useState, useEffect } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import style from "./from-talleres_crear-actualizar.module.css";




const usuarios = [
   
  {
    id:1,
    Nombre: "Banda de guerra",
    Tipo:"Mixto",
    Estatus:"Activo"
  },
  {
    id:2,
    Nombre: "Escolta",
    Tipo:"Mixto",
    Estatus:"Activo"
  },  {
    id:3,
    Nombre: "Atletismo",
    Tipo:"Mixto",
    Estatus:"Activo"
  },  {
    id:4,
    Nombre: "Beisbol Varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
  },  {
    id:5,
    Nombre: "Basquetbal Femenil",
    Tipo:"Femenil",
    Estatus:"Activo"
  },  {
    id:6,
    Nombre: "Ajedrez",
    Tipo:"Mixto",
    Estatus:"Activo"
  },  {
    id:7,
    Nombre: "Futbol Varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
  },  {
    id:8,
    Nombre: "Softbol Varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
  },
];

const FormTalleresCrearActualizar = () => {
  const { userId } = useParams();
  const [nombre, setNombre] = useState("");
  const [estatus, setEstatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [estatusError, setEstatusError] = useState("");


  const navigate = useNavigate();


  useEffect(() => {
    const usuario = usuarios.find(user => user.id === parseInt(userId as string));
    if (usuario) {
      setNombre(usuario.Nombre);
      setEstatus(usuario.Estatus);


    } else {
      console.error("Taller no encontrado");
    }
  }, [userId, usuarios]);

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setNombreError("");
    setEstatusError("");

    if (!nombre) {
      setNombreError("Ingrese nombre(s).");
      isValid = false;
    } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setNombreError("No se aceptan dígitos numéricos.");
      isValid = false;
    }

    if (!estatus) {
      setEstatusError("Seleccione un estatus.");
      isValid = false;
    }

    if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
    } else {
      setAlertSeverity("success");
      setAlertMessage("Taller actualizado con éxito.");
      setShowAlert(true);

      // Solo resetea los valores si es un nuevo registro, no en actualización
      if (!userId) {
        setNombre("");
        setEstatus("");
      }
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