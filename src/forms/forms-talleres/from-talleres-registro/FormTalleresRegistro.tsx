import { useState } from "react";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import style from "./from-talleres-registro.module.css";
import TimeSelector from "../../../components/TimeSelector/TimeSelector";
import MultipleDaySelector from "../../../components/Days-Selector/MultipleDaySelector";

const FormTalleresRegistro = () => {
  const [nombre, setNombre] = useState("");
  const [turno, setTurno] = useState("");
  const [profesorseleccionado, setProfesorSeleccionado] = useState("");
  const [periodoescolar, setPeriodoEscolar] = useState("");
  const [horarioinicio, setHorarioinicio] = useState<{ hour: string; minute: string; period: string } | null>(null);
  const [horariofin, setHorariofin] = useState<{ hour: string; minute: string; period: string } | null>(null);
  const [ubicacion, setUbicacion] = useState("");
  const [puntos, setPuntos] = useState("");
  const [cupos, setCupos] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success"); // Tipado más estricto
  const [alertMessage, setAlertMessage] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [turnoError, setTurnoError] = useState("");
  const [profesorseleccionadoError, setProfesorSeleccionadoError] = useState("");
  const [periodoescolarError, setPeriodoEscolarError] = useState("");
  const [diasError, setDiasError] = useState("");

  const [horarioinicioError, setHorarioinicioError] = useState("");
  const [horariofinError, setHorariofinError] = useState("");
  const [ubicacionError, setUbicacionError] = useState("");
  const [puntosError, setPuntosError] = useState("");
  const [cuposError, setCuposError] = useState("");


  const navigate = useNavigate();

  const handleRegistrarClick = () => {
    let isValid = true;

    // Reset error messages
    setNombreError("");
    setTurnoError("");
    setProfesorSeleccionadoError("");
    setPeriodoEscolarError("");
   
    setHorarioinicioError("");
    setHorariofinError("");
    setUbicacionError("");
    setPuntosError("");
    setCuposError("");
    setDiasError("");

    if (!nombre) {
      setNombreError("Seleccione taller.");
      isValid = false;
    }
    if (!turno) {
      setTurnoError("Seleccione turno.");
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
      setUbicacionError("Seleccione una ubicación.");
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

    if (!nombre || !turno || !profesorseleccionado || !periodoescolar || !ubicacion || !puntos || !cupos || !diasSeleccionados) {
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
      setTurno("");
      setProfesorSeleccionado("");
      setPeriodoEscolar("");
      setHorarioinicio(null);
      setHorariofin(null);
      setUbicacion("");
      setPuntos("");
      setCupos("");
      setDiasSeleccionados([]);

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
                  onChange={setNombre}
                  options={["Voleibol Varonil", "Voleibol Femanil","Futbol Varonil", "Basquetbol Mixto", "Basquetbol Varonil", "Basquetbol Femenil", "Beisbol Varonil", "Beisbol Femenil", "Esport", "Lectura", "Folklore", "Batucada", "Reforestación", "Cuidado Ambiental"]}
                  placeholder="seleccione un taller"
                  size="small"
                />
                
                {nombreError && (
                  <ComponentAlert open={!!nombreError} severity="error" message={nombreError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
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
                  <ComponentAlert open={!!profesorseleccionadoError} severity="error" message={profesorseleccionadoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                )}
              </div>
              
            <div className={style['ubicacion']}>
              <Select
                label="Ubicación"
                value={ubicacion}
                onChange={setUbicacion}
                options={[
                  "Cancha principal del tecnológico",
                  "Polifuncional",
                  "Campo del tecnológico",
                  "Biblioteca"
                ]}
                placeholder="Seleccione la ubicación"
                size="medium"
              />
              {ubicacionError && (
                <ComponentAlert open={!!ubicacionError} severity="error" message={ubicacionError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
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
                <ComponentAlert open={!!periodoescolarError} severity="error" message={periodoescolarError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
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
                    <ComponentAlert open={!!horarioinicioError} severity="error" message={horarioinicioError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
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
                    <ComponentAlert open={!!horariofinError} severity="error" message={horariofinError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }} />
                  )}
                </div>
          </div>
         </div>
  

         <div className={style['card']}>
              <Select
                label="Estatus Card"
                value={turno}
                onChange={setTurno}
                options={[
                  "Activo",
                  "Inactivo"
                ]}
                placeholder="Seleccione card"
                size="xxxsmall"
              />
              {turnoError && (
                <ComponentAlert open={!!turnoError} severity="error" message={turnoError} sx={{ width: 'auto', height: 'auto', fontSize: '13px' }}/>
              )}
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
        
</div>

          <div className={style["button"]}>
            <div className={style["buttons"]}>
              <ButtonRegistro
                onClick={handleRegistrarClick}
                label="Registrar"
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

export default FormTalleresRegistro;