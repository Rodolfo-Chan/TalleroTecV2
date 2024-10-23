import { useState, useEffect } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import style from "../from-talleres-actualizar/from-talleres-actualizar.module.css";
import TimeSelector from "../../../components/TimeSelector/TimeSelector";
import MultipleDaySelector from "../../../components/Days-Selector/MultipleDaySelector";


const usuarios = [
   
   {
     id:1,
     Taller: "Banda de guerra",
     Tipo:"Mixto",
     ProfesorSeleccionado: "Juan Sanchez",
     /*Apellidos: "Perez Ancona",*/
     "Periodo escolar": "AGO-DIC/2024",
     HorarioInicio: { hour: "08", minute: "00", period: "AM" },
     HorarioFin: { hour: "10", minute: "00", period: "AM" },
     Ubicacion: "Cancha principal del tec",
     Turno: "Matutino",
     Puntos: "10",
     Cupos:"30",
     Dias: ["Lunes", "Miércoles", "Viernes"],
     Card:"Activo"

   },
 {
   id:2,
   Taller: "Escolta",
   Tipo:"Mixto",
   ProfesorSeleccionado:"Carlos",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Cancha principal del tec",
   Turno: "Matutino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:3,
   Taller: "Atletismo",
   Tipo:"Mixto",
   ProfesorSeleccionado:"Hernesto Daniel",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },  
   Ubicacion: "Polifuncional",
   Turno: "Vespertino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:4,
   Taller: "Beisbol Varonil",
   Tipo:"Varonil",
   ProfesorSeleccionado:"Carlos Ramon",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Campo del tec",
   Turno: "Matutino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:5,
   Taller: "Basquetbal Femenil",
   Tipo:"Femenil",
   ProfesorSeleccionado: "Juan Sanchez",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Cancha principal del tec",
   Turno: "Matutino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:6,
   Taller: "Ajedrez",
   Tipo:"Mixto",
   ProfesorSeleccionado:"Carolina Andrea",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Biblioteca",
   Turno: "Matutino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:7,
   Taller: "Futbol varonil",
   Tipo:"Varonil",
  ProfesorSeleccionado:"Alan Abel",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Campo del tecnologico",
   Turno: "Matutino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 },
 {
   id:8,
   Taller: "Softbol Varonil",
   Tipo:"Varonil",
 ProfesorSeleccionado:"Alejandro Andres",
   /*Apellidos: "Perez Ancona",*/
   "Periodo escolar": "AGO-DIC/2024",
   HorarioInicio: { hour: "08", minute: "00", period: "AM" },
   HorarioFin: { hour: "10", minute: "00", period: "AM" },
   Ubicacion: "Campo de la polifuncional",
   Turno: "Vespertino",
   Puntos: "10",
   Cupos:"30",
   Dias: ["Lunes", "Miércoles", "Viernes"],
   Card:"Activo"
 }
];

const FormTalleresActualizar = () => {
  const { userId } = useParams();
  const [taller, setTaller] = useState("");
  const [turno, setTurno] = useState("");
  const [card, setCard] = useState("");
  const [profesorseleccionado, setProfesorSeleccionado] = useState("");
  const [periodoescolar, setPeriodoEscolar] = useState("");
  const [horarioinicio, setHorarioinicio] = useState<{ hour: string; minute: string; period: string } | null>(null);
  const [horariofin, setHorariofin] = useState<{ hour: string; minute: string; period: string } | null>(null);
  const [ubicacion, setUbicacion] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);
  const [tipo, setTipo] = useState("");

  const [puntos, setPuntos] = useState("");
  const [cupos, setCupos] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [tallerError, setTallerError] = useState("");
  const [turnoError, setTurnoError] = useState("");
  const [profesorseleccionadoError, setProfesorSeleccionadoError] = useState("");
  const [periodoescolarError, setPeriodoEscolarError] = useState("");
  const [cardError, setCardError] = useState("");
  const [horarioinicioError, setHorarioinicioError] = useState("");
  const [horariofinError, setHorariofinError] = useState("");
  const [ubicacionError, setUbicacionError] = useState("");
  const [puntosError, setPuntosError] = useState("");
  const [cuposError, setCuposError] = useState("");
  const [diasError, setDiasError] = useState("");
  const [tipoError, setTipoError] = useState("");


  const navigate = useNavigate();


  useEffect(() => {
    const usuario = usuarios.find(user => user.id === parseInt(userId as string));
    if (usuario) {
      setTaller(usuario.Taller);
      setTipo(usuario.Tipo);
      setTurno(usuario.Turno);
      setCard(usuario.Card);
      setProfesorSeleccionado(usuario.ProfesorSeleccionado);
      setPeriodoEscolar(usuario["Periodo escolar"]);
      setHorarioinicio(usuario.HorarioInicio);
      setHorariofin(usuario.HorarioFin);
      setUbicacion(usuario.Ubicacion);
      setPuntos(usuario.Puntos);
      setCupos(usuario.Cupos);
      setDiasSeleccionados(usuario.Dias || []);
     

    } else {
      console.error("Taller no encontrado");
    }
  }, [userId, usuarios]);


  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setTallerError("");
    setTurnoError("");
    setCardError("");
    setProfesorSeleccionadoError("");
    setPeriodoEscolarError("");
    setTipoError("");

    setHorarioinicioError("");
    setHorariofinError("");
    setUbicacionError("");
    setPuntosError("");
    setCuposError("");
    setDiasError("");

    if (!taller) {
      setTallerError("Ingrese nombre del taller.");
      isValid = false;
    } else if (!taller.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setTallerError("Solo se aceptan letras minúsculas y mayúsculas.");
      isValid = false;
    }
    if (diasSeleccionados.length < 2) {
      setDiasError("Seleccione al menos dos días.");
      isValid = false;
    }
    if (!turno) {
      setTurnoError("Seleccione turno.");
      isValid = false;
    }
    if (!card) {
      setCardError("Seleccione estatus.");
      isValid = false;
    }
    if (!profesorseleccionado) {
      setProfesorSeleccionadoError("Seleccione profesor.");
      isValid = false;
    }

    if (!periodoescolar) {
      setPeriodoEscolarError("Ingrese perido.");
      isValid = false;
    }

    if (!horarioinicio || !horarioinicio.hour || !horarioinicio.minute || !horarioinicio.period) {
      setHorarioinicioError("Campo obligatorio.");
      isValid = false;
    }

    if (!horariofin || !horariofin.hour || !horariofin.minute || !horariofin.period) {
      setHorariofinError("Campo obligatorio.");
      isValid = false;
    }

    if (!ubicacion) {
      setUbicacionError("Ingrese la ubicación.");
      isValid = false;
    } else if (!ubicacion.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      setUbicacionError("No se aceptan dígitos numéricos.");
      isValid = false;
    }

    if (!puntos) {
      setPuntosError("Ingrese puntos.");
      isValid = false;
    } else if (!puntos.match(/^\d+$/)) {
      setPuntosError("Ingrese dígitos numéricos.");
      isValid = false;
    }
    if (!cupos) {
      setCuposError("Ingrese capacidad.");
      isValid = false;
    } else if (!puntos.match(/^\d+$/)) {
      setCuposError("Ingrese dígitos numéricos.");
      isValid = false;
    }
      if (diasSeleccionados.length < 2) {
        setDiasError("Seleccione al menos dos días.");
        isValid = false;
      }
      if (!tipo) {
        setTipoError("Seleccione tipo.");
        isValid = false;
      }

    if (!taller || !turno || !card || !profesorseleccionado || !periodoescolar || !ubicacion || !puntos  || !cupos || !diasSeleccionados || !tipo ) {
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
            <h1 className={style["list"]}>Actualizar datos del taller</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
            <div className={style['nombre_taller']}>
            <Select
                  label="Taller"
                  value={taller}
                  onChange={setTaller}
                  options={["Voleibol Varonil", "Voleibol Femanil","Futbol Varonil", "Basquetbol Mixto", "Basquetbol Varonil", "Basquetbol Femenil", "Beisbol Varonil", "Beisbol Femenil", "Esport", "Lectura", "Folklore", "Batucada", "Reforestación", "Cuidado Ambiental"]}
                  placeholder="seleccione un taller"
                  size="xsmall"
                />
              {tallerError && (
                <ComponentAlert open={!!tallerError} severity="error" message={tallerError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
              )}
            </div>

            <div className={`${style['tipo_taller']}`}>
                <Select
                  label="Tipo taller"
                  value={tipo}
                  onChange={setTipo}
                  options={["Femenil", "Varonil", "Mixto"]}
                  placeholder="seleccione tipo"
                  size="xxxsmall"
                />
                
                {tipoError && (
                  <ComponentAlert open={!!tipoError} severity="error" message={tipoError} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />
                )}
              </div>

            <div className={style['nombre_profesor']}>
                <Select
                  label="Profesor del taller"
                  value={profesorseleccionado}
                  onChange={setProfesorSeleccionado}
                  options={[
                    "Andres Agustin Pech Canche",
                    "Rosario Balan Dzib",
                    "Ana Barbara Gamboa Cen",
                    "Roger Cruz Cen May",
                    "Abel Hernesto Hernandez de la Parra",
                    "Emanuel Abran Chan Nahuat"
                  ]}
                  placeholder="Seleccione al profesor del taller"
                  size="medium"
                />
                {profesorseleccionadoError && (
                  <ComponentAlert open={!!profesorseleccionadoError} severity="error" message={profesorseleccionadoError}sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}  />
                )}
              </div>

              <div className={style['ubicacion']}>
              <Input
                label="Ubicación"
                value={ubicacion}
                onChange={setUbicacion}
                placeHolder="Ingrese la ubicación"
                size="xmedium"
              />
              {ubicacionError && (
                <ComponentAlert open={!!ubicacionError} severity="error" message={ubicacionError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
              )}
            </div>



          </div>

          <div className={style["datos_seccion2"]}>

          <div className={style['periodo-escolar']}>
              <Input
                label="Periodo escolar"
                value={periodoescolar}
                onChange={setPeriodoEscolar}
                placeHolder="Ingrese el periodo"
                size="xxsmall"
              />
              {periodoescolarError && (
                <ComponentAlert open={!!periodoescolarError} severity="error" message={periodoescolarError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
              )}
            </div>
        
          <div className={style['turno']}>
              <Select
                label="Turno"
                value={turno}
                onChange={setTurno}
                options={[
                  "Matutino",
                  "Vespertino"
                ]}
                placeholder="Seleccione el turno"
                size="xxsmall"
              />
              {turnoError && (
                <ComponentAlert open={!!turnoError} severity="error" message={turnoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
              )}
            </div>

            
            <div className={style['cupos-taller']}>
              <Input
                label="Cupos del Taller"
                value={cupos}
                onChange={setCupos}
                placeHolder="Ingrese la capacidad"
                size="xsmall"
              />
              {cuposError && (
                <ComponentAlert open={!!cuposError} severity="error" message={cuposError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
              )}
            </div>

         <div className ={`${style['contenedor-horarios']}`}>
          <div className ={`${style['titulo-horario']}`}>
          <h1 className={style["name-horario"]}>Horario del taller</h1>
          </div>
          <div className ={`${style['horarios']}`}>
          <div className={style['horario-tallerinicio']}>
                  <TimeSelector
                    label="Hora de inicio"
                    hour={horarioinicio?.hour || ""}
                    minute={horarioinicio?.minute || ""}
                    period={horarioinicio?.period || ""}
                    onHourChange={(hour) => setHorarioinicio(prev => ({
                      hour: hour,
                      minute: prev?.minute || "",
                      period: prev?.period || ""
                    }))}
                    onMinuteChange={(minute) => setHorarioinicio(prev => ({
                      hour: prev?.hour || "",
                      minute: minute,
                      period: prev?.period || ""
                    }))}
                    onPeriodChange={(period) => setHorarioinicio(prev => ({
                      hour: prev?.hour || "",
                      minute: prev?.minute || "",
                      period: period
                    }))}
                  />
                  {horarioinicioError && (
                    <ComponentAlert open={!!horarioinicioError} severity="error" message={horarioinicioError} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }}/>
                  )}
                </div>
                <div className ={`${style['horario-tallerfin']}`}>
                <TimeSelector
                    label="Hora de finalización"
                    hour={horariofin?.hour || ""}
                    minute={horariofin?.minute || ""}
                    period={horariofin?.period || ""}
                    onHourChange={(hour) => setHorariofin(prev => ({
                      hour: hour,
                      minute: prev?.minute || "",
                      period: prev?.period || ""
                    }))}
                    onMinuteChange={(minute) => setHorariofin(prev => ({
                      hour: prev?.hour || "",
                      minute: minute,
                      period: prev?.period || ""
                    }))}
                    onPeriodChange={(period) => setHorariofin(prev => ({
                      hour: prev?.hour || "",
                      minute: prev?.minute || "",
                      period: period
                    }))}
                  />
                  {horariofinError && (
                    <ComponentAlert open={!!horariofinError} severity="error" message={horariofinError}sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />
                  )}
                </div>
          </div>

         </div>
              

   
          </div>

          <div className={style["datos_seccion3"]}>
       <div className ={`${style['dias_taller']}`}>
       <MultipleDaySelector
      label="Días del Taller"
      selectedDays={diasSeleccionados}
      onDayChange={setDiasSeleccionados}
    />
    {diasError && (
      <ComponentAlert open={!!diasError} severity="error" message={diasError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
    )}  
        </div>  

        <div className={style['puntos-taller']}>
              <Input
                label="Puntos del Taller"
                value={puntos}
                onChange={setPuntos}
                placeHolder="Ingrese los puntos"
                size="xsmall"
              />
              {puntosError && (
                <ComponentAlert open={!!puntosError} severity="error" message={puntosError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
              )}
            </div>

            <div className={style['card']}>
              <Select
                label="Estatus Card"
                value={card}
                onChange={setCard}
                options={[
                  "Activo",
                  "Inactivo"
                ]}
                placeholder="Seleccione card"
                size="xxsmall"
              />
              {cardError && (
                <ComponentAlert open={!!cardError} severity="error" message={cardError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                onClick={() => navigate("/Talleres")}
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