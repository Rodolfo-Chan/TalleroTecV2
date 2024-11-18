import { useState, useEffect } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import style from "../from-talleres-actualizar/from-talleres-actualizar.module.css";
import TimeSelector from "../../../components/TimeSelector/TimeSelector";
import MultipleDaySelector from "../../../components/Days-Selector/MultipleDaySelector";
import axios from "axios";

interface Taller {
  id_taller_catalogo: number;
  nombre_taller: string;
  estatus_taller: boolean;
}


interface Horario {
  hour: string;
  minute: string;
}


const FormTalleresActualizar = () => {
  const { userId } = useParams();
  const [nombre, setNombre] = useState<number | string>('');
  const [nombres, setNombres] = useState<{ id_taller_catalogo: number; nombre_taller: string }[]>([]);

  const [turno, setTurno] =useState<string>('');
  const [card, setCard] =  useState<string>('');
  const [profesorseleccionado, setProfesorSeleccionado] =  useState<number | string>('');
  const [profesoresseleccionados, setProfesoresSeleccionados] = useState<{ id_instructor: number; nombre: string; apellido_paterno: string; apellido_materno: string  }[]>([]);

  const [periodoescolar, setPeriodoEscolar] =  useState<string>('');
  const [horarioinicio, setHorarioinicio] = useState<Horario>({ hour: "", minute: "" });
  const [horariofin, setHorariofin] = useState<Horario>({ hour: "", minute: "" });
  
  const [ubicacion, setUbicacion] = useState("");
  const [puntos, setPuntos] =  useState<string>('');
  const [cupos, setCupos] = useState<string>('');
  const [diasSeleccionados, setDiasSeleccionados] = useState<string>("");
  const [tipo, setTipo] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    nombre: '',
    turno: '',
    card: '',
    profesorseleccionado: '',
    periodoescolar: '',
    horarioinicio: '',
    horariofin: '',
    ubicacion: '',
    puntos: '',
    cupos: '',
    diasSeleccionados: '',
    tipo: ''
});

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/')
      .then((response) => {
        const talleresActivos = response.data.filter((taller: Taller) => taller.estatus_taller === true);
        setNombres(talleresActivos);
      })
      .catch((error) => console.error("Error al cargar catalogo de talleres", error));
  
    axios.get('https://drftallerotecdj.onrender.com/talleres/api/instructores/')
      .then((response) => setProfesoresSeleccionados(response.data))
      .catch((error) => console.error("Error al cargar profesor seleccionado", error));
  
    if (userId) {
      axios.get(`https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/${userId}/`)
        .then(response => {
          const registroData = response.data;
          setNombre(registroData.id_taller_catalogo);
          setTurno(registroData.turno_taller);
          // setCard(registroData.estatus_card);
          setCard(registroData.estatus_card === true ? "Activo" : "Inactivo");  // Asignar como "Activo" o "Inactivo"

          setProfesorSeleccionado(registroData.id_instructor);
          setPeriodoEscolar(registroData.periodo_escolar);
  
          // Descomponer `hora_inicio` y `hora_final` en `hour` y `minute`
          const [horaInicioHour, horaInicioMinute] = registroData.hora_inicio.split(':');
          const [horaFinHour, horaFinMinute] = registroData.hora_final.split(':');
          setHorarioinicio({ hour: horaInicioHour, minute: horaInicioMinute });
          setHorariofin({ hour: horaFinHour, minute: horaFinMinute });
  
          setUbicacion(registroData.ubicacion);
          setPuntos(registroData.puntos_taller);
          setCupos(registroData.cupo_taller);
          setDiasSeleccionados(registroData.dias_taller);
          setTipo(registroData.tipo_taller);
        })
        .catch(error => console.error("Error al cargar los datos del alumno:", error));
    }
  }, [userId]);
  
  const handleEditClick = async () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validaciones de cada campo
  if (!nombre) {
    newErrors.nombre = "Seleccione taller.";
    isValid = false;
  }

  if (!turno) {
    newErrors.turno = "Seleccione turno."; 
    isValid = false;
  }

  // if (!card) {
  //   newErrors.card = "Seleccione estatus."; 
  //   isValid = false;
  // }
  if (card === null || card === undefined) {
    newErrors.card = "Seleccione un estatus card.";
    isValid = false;
  }

  if (!profesorseleccionado) {
    newErrors.profesorseleccionado = "Seleccione profesor."; 
    isValid = false;
  }

  if (!periodoescolar) {
    newErrors.periodoescolar = "Ingrese periodo."; 
    isValid = false;
  }

  if (!horarioinicio || !horarioinicio.hour || !horarioinicio.minute) {
    newErrors.horarioinicio = "Campo obligatorio."; 
    isValid = false;
  }

  if (!horariofin || !horariofin.hour || !horariofin.minute) {
    newErrors.horariofin = "Campo obligatorio."; 
    isValid = false;
  }

  if (!ubicacion) {
    newErrors.ubicacion = "Ingrese la ubicación.";
    isValid = false;
  } else if (!ubicacion.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
    newErrors.ubicacion = "No se aceptan dígitos numéricos.";
    isValid = false;
  }

  if (!puntos) {
    newErrors.puntos = "Ingrese puntos.";
    isValid = false;
  } else if (!String(puntos).match(/^\d+$/)) {  // Convertimos a string
    newErrors.puntos = "Ingrese dígitos numéricos.";
    isValid = false;
  }
  
  if (!cupos) {
    newErrors.cupos = "Ingrese capacidad.";
    isValid = false;
  } else if (!String(cupos).match(/^\d+$/)) {  // Convertimos a string
    newErrors.cupos = "Ingrese dígitos numéricos.";
    isValid = false;
  }
  
  if (diasSeleccionados.length < 2) {
    newErrors.diasSeleccionados = "Seleccione al menos dos días.";
    isValid = false;
  }

  if (!tipo) {
    newErrors.tipo = "Seleccione tipo.";
    isValid = false;
  }

  setErrors(newErrors);

  if (!isValid) {
    setAlertSeverity("error");
    setAlertMessage("Por favor complete todos los campos.");
    setShowAlert(true);
    return;
  }

    // Formatear las horas a formato hh:mm
     const formatTime = (hour: string, minute: string) => {
       return `${hour}:${minute}`;
     };
  
     const horaInicioFormateada = formatTime(horarioinicio?.hour || "", horarioinicio?.minute || "");
     const horaFinFormateada = formatTime(horariofin?.hour || "", horariofin?.minute || "");
     
    // Convertir el estatus a un valor booleano


     
      const updatedRegistro = {
        id_taller_catalogo: nombre,
        periodo_escolar: periodoescolar,
        ubicacion,
        turno_taller: turno,
        hora_inicio: horaInicioFormateada,  // Formato hh:mm
        hora_final: horaFinFormateada,      // Formato hh:mm
     //   estatus_card: cardBoolean,
        estatus_card: card === "Activo",  // Convertir "Activo" a true, "Inactivo" a false

        dias_taller: diasSeleccionados,
        puntos_taller: puntos,
        cupo_taller: cupos,
        tipo_taller: tipo,
        id_instructor: profesorseleccionado,
    };
    try {
      const response = await axios.put(`https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/${userId}/`, updatedRegistro);
      if (response.status === 200) {
          setShowAlert(true);
          setAlertSeverity("success");
          setAlertMessage("Datos actualizados correctamente.");
      }
  } catch (error) {
      console.error("Error al actualizar los datos del registro:", error);
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Se encontraron datos repetidos");
  }
};


  return (
    <div className={style["div-container"]}>
    <div className={style["name-module"]}>
      <h1 className={style["name"]}>TALLERES</h1>
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
        <div className={`${style['nombre_taller']}`}>
          <Select
                      label="Taller"
                      value={nombre}
                      onChange={(value) => setNombre(Number(value))}
                      options={nombres.map((id_taller_catalogo) => ({ value: id_taller_catalogo.id_taller_catalogo, label: id_taller_catalogo.nombre_taller }))}
                      placeholder="Seleccione el taller"
                      size="small"
                  />
                      {errors.nombre && <ComponentAlert open={!!errors.nombre} severity="error" message={errors.nombre} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            </div>

            <div className={`${style['tipo_taller']}`}>
<Select
                          label="Tipo taller"
                          value={tipo}
                          onChange={(value) => setTipo(value as string)}
                          options={[
                              { value: "Femenil", label: "Femenil" },
                              { value: "Varonil", label: "Varonil" },
                              { value: "Mixto", label: "Mixto" },
                          ]}
                          placeholder="Seleccione tipo"
                          size="xxxsmall"
                      />
                      {errors.tipo && <ComponentAlert open={!!errors.tipo} severity="error" message={errors.tipo} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}

            </div>

          <div className={style['nombre_profesor']}>
                          <Select
                label="Profesor del taller"
                value={profesorseleccionado}
                onChange={(value) => setProfesorSeleccionado(Number(value))}
                options={profesoresseleccionados.map((profesor) => ({
                  value: profesor.id_instructor,
                  label: `${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}`
                }))}
                placeholder="Seleccione al profesor del taller"
                size="medium"
              />
                      {errors.profesorseleccionado && <ComponentAlert open={!!errors.profesorseleccionado} severity="error" message={errors.profesorseleccionado} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            
            </div>
            <div className={style['ubicacion']}>
              <Input label="Ubicación"
                          value={ubicacion}
                          onChange={(value) => setUbicacion(value)}
                          placeHolder="Ingrese la ubicación"
                          size="xmedium"
              />
                {errors.ubicacion && <ComponentAlert open={!!errors.ubicacion} severity="error" message={errors.ubicacion} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
               
          </div>

        </div>

        <div className={style["datos_seccion2"]}>
      
          <div className={style['periodo-escolar']}>
            <Input label="Periodo escolar"
                          value={periodoescolar}
                          onChange={(value) => setPeriodoEscolar(value)}
                          placeHolder="Ingrese el periodo"
                          size="xxsmall"
              />
                {errors.periodoescolar && <ComponentAlert open={!!errors.periodoescolar} severity="error" message={errors.periodoescolar} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}    
          </div>
          
    
          <div className={style['turno']}>
            <Select
                          label="Turno"
                          value={turno}
                          onChange={(value) => setTurno(value as string)}
                          options={[
                              { value: "Matutino", label: "Matutino" },
                              { value: "Vespertino", label: "Vespertino" },
                          ]}
                          placeholder="Seleccione un turno"
                          size="xxsmall"
                      />
                      {errors.turno && <ComponentAlert open={!!errors.turno} severity="error" message={errors.turno} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
          </div>

          
          <div className={style['cupos-taller']}>
            <Input label="Cupo del taller"
                          value={cupos}
                          onChange={(value) => setCupos(value)}
                          placeHolder="Ingrese la capacidad"
                          size="xsmall"
              />
                {errors.cupos && <ComponentAlert open={!!errors.cupos} severity="error" message={errors.cupos} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}    
          </div>

          <div className ={`${style['contenedor-horarios']}`}>
        <div className ={`${style['titulo-horario']}`}>
        <h1 className={style["name-horario"]}>Horario del taller</h1>
        </div>
        <div className ={`${style['horarios']}`}>
        <div className={style['horario-tallerinicio']}>
        <TimeSelector
label="Hora de inicio"
hour={horarioinicio.hour || ""}
minute={horarioinicio.minute || ""}
onHourChange={(hour) =>
  setHorarioinicio((prev) => ({
    ...prev,
    hour,
  }))
}
onMinuteChange={(minute) =>
  setHorarioinicio((prev) => ({
    ...prev,
    minute,
  }))
}
/>
                  {errors.horarioinicio && <ComponentAlert open={!!errors.horarioinicio} severity="error" message={errors.horarioinicio} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>
              <div className ={`${style['horario-tallerfin']}`}>
              <TimeSelector
label="Hora de finalización"
hour={horariofin.hour || ""}
minute={horariofin.minute || ""}
onHourChange={(hour) =>
  setHorariofin((prev) => ({
    ...prev,
    hour,
  }))
}
onMinuteChange={(minute) =>
  setHorariofin((prev) => ({
    ...prev,
    minute,
  }))
}
/>
                  {errors.horariofin && <ComponentAlert open={!!errors.horariofin} severity="error" message={errors.horariofin} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                  </div>
        </div>
       </div>

        </div>

        <div className={style["datos_seccion3"]}>
     <div className ={`${style['dias_taller']}`}>
{/* aqui va el selector de dias */}
<MultipleDaySelector
    label="Días del Taller"
    selectedDays={diasSeleccionados}
    onDayChange={setDiasSeleccionados}
  

  />
{errors.dias && <ComponentAlert open={!!errors.dias} severity="error" message={errors.dias} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}

      </div>  

      <div className={style['puntos-taller']}>
        <Input label="Puntos del taller"
                          value={puntos}
                          onChange={(value) => setPuntos(value)}
                          placeHolder="Ingrese los puntos"
                          size="xsmall" />
                      {errors.puntos && <ComponentAlert open={!!errors.puntos} severity="error" message={errors.puntos} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
               
          </div>

          <div className={style['card']}>


            <Select
                       label="Estatus Card"
                       value={card}
                       onChange={(value) => setCard(value as string)}
                       options={[
                           { value: "Activo", label: "Activo" },
                           { value: "Inactivo", label: "Inactivo" },
                       ]}
                       placeholder="Seleccione estatus"
                       size="xxsmall"
           />
             {errors.card && <ComponentAlert open={!!errors.card} severity="error" message={errors.card} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
         
          </div>
      
</div>

<div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro onClick={handleEditClick} label="Actualizar"/>
              <ButtonRegistro
                onClick={() => {
                  navigate("/Talleres");
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

export default FormTalleresActualizar;