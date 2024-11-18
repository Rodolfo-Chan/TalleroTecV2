import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import { useNavigate, useParams } from "react-router-dom";
import style from "./from-inscripciones-actualizar.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";

interface Alumno {
  id_alumno: number;
  matricula_alumno: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
}

interface Subgrupo {
  id_taller_registro: number;
  periodo_escolar: string;
  dias_taller: string;
  hora_inicio_12h: string;
  hora_final_12h: string;
  ubicacion: string;
  turno_taller: string;
  tipo_taller: string;
  id_taller_catalogo: number;
  puntos_taller:number;
}

interface Supergrupo {
  id_taller_catalogo: number;
  nombre_taller: string;
}

const FormInscripcionesActualizar = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [subgrupos, setSubgrupos] = useState<Subgrupo[]>([]);
  const [supergrupos, setSupergrupos] = useState<Supergrupo[]>([]);
  const [periodos, setPeriodos] = useState<string[]>([]);
  const [selectedMatricula, setSelectedMatricula] = useState<string>("");
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [selectedSubgrupo, setSelectedSubgrupo] = useState<Subgrupo | null>(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("");
  const [estatus, setEstatus] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("error");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>(); // Capturamos el userId desde la URL

  useEffect(() => {
    if (userId) {
      // Obtener los alumnos, subgrupos y supergrupos una vez
      axios.get<Alumno[]>("https://drftallerotecdj.onrender.com/talleres/api/alumnos/")
        .then(response => {
          setAlumnos(response.data);
        })
        .catch(error => console.error("Error al obtener los alumnos:", error));
  
      axios.get<Subgrupo[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/")
        .then(response => {
          setSubgrupos(response.data);
          setPeriodos([...new Set(response.data.map(subgrupo => subgrupo.periodo_escolar))]);
        })
        .catch(error => console.error("Error al obtener los subgrupos:", error));
  
      axios.get<Supergrupo[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/")
        .then(response => {
          setSupergrupos(response.data);
        })
        .catch(error => console.error("Error al obtener los supergrupos:", error));
    }
  }, [userId]);
  
  useEffect(() => {
    if (userId && alumnos.length > 0 && subgrupos.length > 0) {
      // Obtener la inscripción solo cuando los datos estén cargados
      axios.get(`https://drftallerotecdj.onrender.com/talleres/api/inscripciones/${userId}/`)
        .then(response => {
          const inscripcion = response.data;
          const alumno = alumnos.find(a => a.id_alumno === inscripcion.id_alumno);
          const subgrupo = subgrupos.find(sg => sg.id_taller_registro === inscripcion.id_taller_registro);
          
          setSelectedAlumno(alumno || null);
          setSelectedSubgrupo(subgrupo || null);
          setSelectedMatricula(alumno ? alumno.matricula_alumno : "");
          setSelectedPeriodo(subgrupo ? subgrupo.periodo_escolar : "");
          setEstatus(inscripcion.estatus);
        })
        .catch(error => {
          console.error("Error al cargar la inscripción:", error);
          setAlertMessage("Error al cargar la inscripción.");
          setAlertSeverity("error");
          setShowAlert(true);
        });
    }
  }, [userId, alumnos, subgrupos]);  // Asegúrate de que los datos estén disponibles antes de la consulta de la inscripción
  
  
  const obtenerNombreTaller = (idTallerCatalogo: number): string => {
    const taller = supergrupos.find((s) => s.id_taller_catalogo === idTallerCatalogo);
    return taller ? taller.nombre_taller : "Nombre desconocido";
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedMatricula) newErrors.matricula = "Ingrese la matrícula del alumno.";
    if (!selectedAlumno) newErrors.alumno = "Alumno no encontrado.";
    if (!selectedPeriodo) newErrors.periodo = "Seleccione un periodo.";
    if (!selectedSubgrupo) newErrors.taller = "Seleccione un taller.";
    if (!estatus) newErrors.estatus = "Seleccione un estatus.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAlumnoBusqueda = async () => {
    const alumnoEncontrado = alumnos.find(alumno => alumno.matricula_alumno === selectedMatricula);
    if (alumnoEncontrado) {
      setSelectedAlumno(alumnoEncontrado);
      setErrors((prevErrors) => ({ ...prevErrors, alumno: "" }));
  
      try {
        // Consultar inscripciones del alumno
        const { data: inscripciones } = await axios.get(
          `https://drftallerotecdj.onrender.com/talleres/api/inscripciones/`
        );
  
        // Filtrar inscripciones del alumno
        const inscripcionesAlumno = inscripciones.filter(
          (inscripcion: { id_alumno: number }) => inscripcion.id_alumno === alumnoEncontrado.id_alumno
        );
  
        // Obtener los puntos acumulados
        let puntosAcumulados = 0;
        for (const inscripcion of inscripcionesAlumno) {
          const subgrupo = subgrupos.find(
            (sg) => sg.id_taller_registro === inscripcion.id_taller_registro
          );
          if (subgrupo) {
            puntosAcumulados += subgrupo.puntos_taller;
          }
        }
  
        // Validar si los puntos acumulados superan o igualan 200
        if (puntosAcumulados >= 200) {
          setAlertMessage(
            // `Este alumno ya tiene ${puntosAcumulados} puntos acumulados. No es posible inscribirlo a más talleres.`
            `Este alumno ya tiene suficientes puntos acumulados. No es posible inscribirlo a más talleres.`
          );
          setAlertSeverity("warning");
          setShowAlert(true);
          setSelectedAlumno(null); // Reiniciar selección
          return;
        }
  
        // Mensaje informativo
        setAlertMessage(
          `Este alumno tiene ${puntosAcumulados} puntos acumulados. Puede inscribirse a más talleres.`
        );
        setAlertSeverity("info");
        setShowAlert(true);
      } catch (error) {
        console.error("Error al consultar inscripciones:", error);
        setAlertMessage("Hubo un error al verificar las inscripciones del alumno.");
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Alumno no encontrado.");
      setAlertSeverity("error");
      setShowAlert(true);
      setSelectedAlumno(null);
    }
  };
  
  const handleSubgrupoChange = (idTallerRegistro: string) => {
    const subgrupoSeleccionado = subgrupos.find(sg => sg.id_taller_registro === Number(idTallerRegistro));
    setSelectedSubgrupo(subgrupoSeleccionado || null);
    setErrors((prevErrors) => ({ ...prevErrors, taller: subgrupoSeleccionado ? "" : "Seleccione un taller." }));
  };

  const handlePeriodoChange = (value: string) => {
    setSelectedPeriodo(value); // Actualizar el periodo seleccionado
    setSelectedSubgrupo(null); // Restablecer el taller
    setErrors((prevErrors) => ({
      ...prevErrors,
      periodo: "",
      taller: "",
      turno: "",
      horario: "",
    })); // Limpiar los errores relacionados
  };

  const handleEditClick = async () => {
    if (!validateFields()) {
      setAlertMessage("Por favor, complete todos los campos.");
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }
  
    const inscripcionActualizada = {
      id_alumno: selectedAlumno!.id_alumno,
      id_taller_registro: selectedSubgrupo!.id_taller_registro,
      estatus: estatus,
    };
  
    try {
      await axios.put(`https://drftallerotecdj.onrender.com/talleres/api/inscripciones/${userId}/`, inscripcionActualizada);
      setAlertMessage("Inscripción actualizada con éxito.");
      setAlertSeverity("success");
      setShowAlert(true);
  
      setErrors({});
    } catch (error) {
      console.error("Error al actualizar la inscripción:", error);
      setAlertMessage("Hubo un error al actualizar la inscripción.");
      setAlertSeverity("error");
      setShowAlert(true);
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
      <Input
          label="Matrícula del Alumno"
          value={selectedMatricula}
          onChange={(value) => setSelectedMatricula(value)}
          placeHolder="Ingresa la matrícula"
          size="xsmall"
        />
        <button className ={`${style['boton-registro']}`} type="button" onClick={handleAlumnoBusqueda}>Buscar Alumno</button>

        </div>
          
        <div className={`${style['nombre']}`}>
        <Input
          label="Nombre del alumno"
          value={selectedAlumno ? `${selectedAlumno.nombre} ${selectedAlumno.apellido_paterno} ${selectedAlumno.apellido_materno}` : ""}
          disabled
          placeHolder="Ingresa la matrícula del alumno"
          size="smedium"

        />
        {errors.matricula && <ComponentAlert open={!!errors.matricula} severity="error" message={errors.matricula} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}

          </div>

          <div className={`${style['periodo-escolar']}`}>
          <Select
  label="Periodo"
  value={selectedPeriodo}
  onChange={(value) => handlePeriodoChange(value as string)}
  options={periodos.map((periodo) => ({ value: periodo, label: periodo }))}
  placeholder="Seleccione un periodo"
  size="xsmall"
/>
        {/* {errors.periodo && <p>{errors.periodo}</p>} */}
        {errors.periodo && <ComponentAlert open={!!errors.periodo} severity="error" message={errors.periodo} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}

            </div>

            <div className={`${style['taller']}`}>
            <Select
  label="Seleccione un taller"
  value={selectedSubgrupo?.id_taller_registro || ""}
  onChange={(value) => handleSubgrupoChange(value as string)}
  options={subgrupos.filter(s => s.periodo_escolar === selectedPeriodo).map((subgrupo) => ({
    value: subgrupo.id_taller_registro,
    label: `${obtenerNombreTaller(subgrupo.id_taller_catalogo)} - ${subgrupo.tipo_taller}`
  }))}
  placeholder="Seleccione un taller"
  size="small"
/>
                {errors.taller && <ComponentAlert open={!!errors.taller} severity="error" message={errors.taller} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }}  />}
            </div>

          </div>

        
        <div className={style["datos_seccion2"]}>
         


        

        <div className={style['turno']}>
           <Input
          label="Turno"
          value={selectedSubgrupo ? selectedSubgrupo.turno_taller : ""}
          placeHolder="Turno del taller"
          disabled
          size="xsmall"
        />
          </div>

          <div className={style['horario']}>
          <Input
          label="Horario"
          value={selectedSubgrupo ? `${selectedSubgrupo.hora_inicio_12h} - ${selectedSubgrupo.hora_final_12h}` : ""}
          placeHolder="Horario del taller"
          disabled
          size="xsmall"

        />
          </div>

 

            <div className={`${style['estatus']}`}>
            <Select
  label="Estatus"
  value={estatus}
  onChange={(value) => setEstatus(value as string)} // Asegúrate de que el estado de estatus se actualice correctamente
  options={[
    { value: "En progreso", label: "En progreso" },
    { value: "Acreditado", label: "Acreditado" },
    { value: "Incompleto", label: "Incompleto" }
  ]}
  placeholder="Seleccione un estatus"
  size="xsmall"
/>

        {errors.estatus && <ComponentAlert open={!!errors.estatus} severity="error" message={errors.estatus} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }}  />}
            </div>
            

        </div>

        <div className={style["button"]}>
          <div className={style["buttons"]}>
          <ButtonRegistro onClick={handleEditClick} label="Actualizar"/>

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
