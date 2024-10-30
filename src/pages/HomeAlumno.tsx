// import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../pages/css/homealumno.module.css";
import ImageCarrusel from "../components/Carrusel/ImageCarrusel";

// Define la interfaz para los talleres
interface Taller {
  nombre: string;
  turno: string;
  inscritos: number; // Número de alumnos inscritos
  cupoMaximo: number; // Número máximo de cupos
  periodo: string;
  activo: boolean;
  visible: boolean;
  id: number;
}

const talleres: Taller[] = [
  { id: 1, nombre: "Atletismo", turno: "Matutino", inscritos: 30, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 2, nombre: "Atletismo", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: false, visible: false },
  { id: 3, nombre: "Voleibol varonil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 4, nombre: "Voleibol femenil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 5, nombre: "Voleibol Mixto", turno: "Matutino", inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 6, nombre: "Voleibol varonil", turno: "Vespertino",  inscritos: 28, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 7, nombre: "Voleibol femenil", turno: "Vespetino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 8, nombre: "Voleibol Mixto", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 9, nombre: "Ajedrez Mixto", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 10, nombre: "Ajedrez Mixto", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 11, nombre: "Esport", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 12, nombre: "Esport", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 13, nombre: "Taekwondo", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 14, nombre: "Taekwondo", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 15, nombre: "Futbol varonil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",activo: true, visible: true },
  { id: 16, nombre: "Futbol femenil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 17, nombre: "Futbol mixto", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 18, nombre: "Futbol varonil", turno: "Vespertino", inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 19, nombre: "Futbol femenil", turno: "Vespertino", inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 20, nombre: "Futbol mixto", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 21, nombre: "Beisbol varonil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 22, nombre: "Basquetbol varonil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 23, nombre: "Basquetbol femenil", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 24, nombre: "Basquetbol mixto", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 25, nombre: "Basquetbol varonil", turno: "Vespertino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 26, nombre: "Basquetbol femenil", turno: "Vespertino", inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 27, nombre: "Basquetbol mixto", turno: "Vespertino", inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024",  activo: true, visible: true },
  { id: 28, nombre: "Cuidado ambiental", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true },
  { id: 29, nombre: "Pintura", turno: "Matutino",  inscritos: 0, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: false, visible: true },
  { id: 30, nombre: "Grupo de batucada", turno: "Matutino", inscritos: 30, cupoMaximo: 30, periodo: "ENE-JUN/2024", activo: true, visible: true }
  

];

const HomeAlumno = () => {
  const navigate = useNavigate(); // Hook de React Router para la navegación

  // Función para manejar la redirección
  const handleCardClick = (taller: Taller) => {
    // Si el taller está activo y tiene cupo disponible
    if (taller.activo && taller.inscritos < taller.cupoMaximo) {
      navigate(`FormInscripcionAlumno/${taller.id}`);
    }
  };

  return (
    <div className={`${style['home-container']}`}>
      <header className={`${style['header']}`}>
        <div className={`${style['header-content']}`}>
          <ImageCarrusel />
          <h1 className={`${style['text']}`}>Seleccione el taller de su preferencia</h1>
          <p className={`${style['nota']}`}>
            Nota: Los talleres se activan en fechas específicas y solo se puede seleccionar un taller por periodo. Verifique que el taller no interfiera con sus actividades académicas.
          </p>
        </div>
      </header>

      <main className={`${style['main-content']}`}>
        <section className={`${style['cards']}`}>
          {talleres
            .filter((taller: Taller) => taller.visible) // Filtrar solo los talleres visibles
            .map((taller: Taller) => (
              <div
                className={`${style['card']}`}
                key={taller.id}
                onClick={() => handleCardClick(taller)} // Pasa el objeto completo
                style={{
                  cursor: taller.activo && taller.inscritos < taller.cupoMaximo ? 'pointer' : 'not-allowed',
                  opacity: !taller.activo || taller.inscritos >= taller.cupoMaximo ? 0.6 : 1 // Cambiar opacidad cuando el taller está lleno o no está disponible
                }}              >
                <div className={`${style['card-content']}`}>
                  <div className={`${style['card-text']}`}>
                    <h2>{taller.nombre}</h2>
                    {taller.activo ? (
                      taller.inscritos < taller.cupoMaximo ? (
                        <>
                          <p className={`${style['datos']}`}>Turno: {taller.turno}</p>
                          <p className={`${style['datos']}`}>Cupo disponible: {taller.cupoMaximo - taller.inscritos}</p>
                          <p className={`${style['datos']}`}>Periodo escolar: {taller.periodo}</p>
                        </>
                      ) : (
                        <p className={`${style['no-disponible']}`}>Ya no se aceptan mas inscripciones para este taller</p>
                      )
                    ) : (
                      <p className={`${style['no-disponible']}`}>No disponible</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default HomeAlumno;