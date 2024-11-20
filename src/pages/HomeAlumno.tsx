import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../pages/css/homealumno.module.css";
import ImageCarrusel from "../components/Carrusel/ImageCarrusel";

interface Subgrupo {
  id_taller_registro: number;
  id_taller_catalogo: number;
  turno_taller: string;
  cupo_taller: number;
  periodo_escolar: string;
  puntos_taller: number;
  estatus_card: boolean;
  tipo_taller: string;
}

interface Supergrupo {
  id_taller_catalogo: number;
  nombre_taller: string;
  estatus_taller: boolean;
}

interface Inscripcion {
  id_inscripcion: number;
  id_alumno: number;
  id_taller_registro: number;
  estatus: string;
}

const HomeAlumno = () => {
  const navigate = useNavigate();
  const [talleres, setTalleres] = useState<any[]>([]);
  const [periodosBloqueados, setPeriodosBloqueados] = useState<string[]>([]);
  const idAlumno = 5; // Usamos el ID del alumno fijo para el bloqueo de las cards que sean del mismo periodo escolar pero puedes poner el localstorach bro para saber que alumno esta accediendo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subgruposRes, supergruposRes, inscripcionesRes] = await Promise.all([
          fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/"),
          fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/"),
          fetch("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/"),
        ]);

        const subgruposData: Subgrupo[] = await subgruposRes.json();
        const supergruposData: Supergrupo[] = await supergruposRes.json();
        const inscripcionesData: Inscripcion[] = await inscripcionesRes.json();

        const inscripcionesAlumno = inscripcionesData.filter(
          (inscripcion) => inscripcion.id_alumno === idAlumno
        );

        const periodosInscritos = inscripcionesAlumno.map((inscripcion) => {
          const subgrupo = subgruposData.find(
            (sub) => sub.id_taller_registro === inscripcion.id_taller_registro
          );
          return subgrupo?.periodo_escolar || "";
        });

        setPeriodosBloqueados(periodosInscritos);

        const subgruposActivos = subgruposData.filter((sub) => sub.estatus_card);

        const talleresCombinados = subgruposActivos.map((subgrupo) => {
          const supergrupo = supergruposData.find(
            (sup) => sup.id_taller_catalogo === subgrupo.id_taller_catalogo
          );

          const inscritos = inscripcionesData.filter(
            (insc) => insc.id_taller_registro === subgrupo.id_taller_registro
          ).length;

          return {
            id: subgrupo.id_taller_registro,
            nombre: `${supergrupo?.nombre_taller || "Taller desconocido"} (${subgrupo.tipo_taller})`,
            turno: subgrupo.turno_taller,
            cupoMaximo: subgrupo.cupo_taller,
            inscritos,
            cupoDisponible: subgrupo.cupo_taller - inscritos,
            periodo: subgrupo.periodo_escolar,
          };
        });

        setTalleres(talleresCombinados);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (taller: any) => {
    if (taller.cupoDisponible > 0 && !periodosBloqueados.includes(taller.periodo)) {
      navigate(`/HomeAlumno/FormInscripcionAlumno/${taller.id}`, {
        state: { tallerData: taller },
      });
    }
  };

  return (
    <div className={`${style["home-container"]}`}>
      <header className={`${style["header"]}`}>
        <div className={`${style["header-content"]}`}>
          <ImageCarrusel />
          <h1 className={`${style["text"]}`}>Seleccione el taller de su preferencia</h1>
          <p className={`${style["nota"]}`}>
            Nota: Los talleres se activan en fechas específicas y solo se puede seleccionar un taller por periodo. Verifique que el taller no interfiera con sus actividades académicas.
          </p>
        </div>
      </header>

      <main className={`${style["main-content"]}`}>
        <section className={`${style["cards"]}`}>
          {talleres.length > 0 ? (
            talleres.map((taller) => {
              const bloqueado = periodosBloqueados.includes(taller.periodo);
              return (
                <div
                  className={`${style["card"]}`}
                  key={taller.id}
                  onClick={() => handleCardClick(taller)}
                  style={{
                    cursor: bloqueado || taller.cupoDisponible === 0 ? "not-allowed" : "pointer",
                    opacity: bloqueado || taller.cupoDisponible === 0 ? 0.6 : 1,
                  }}
                >
                  <div className={`${style["card-content"]}`}>
                    <div className={`${style["card-text"]}`}>
                      <h2>{taller.nombre}</h2>
                      <p className={`${style["datos"]}`}>Turno: {taller.turno}</p>
                      <p className={`${style["datos"]}`}>
                        Cupo disponible: {taller.cupoDisponible}
                      </p>
                      <p className={`${style["datos"]}`}>Periodo escolar: {taller.periodo}</p>
                      {bloqueado && (
                        <p className={`${style["bloqueado"]}`} style={{ color: "red" }}>
                          Solo se acepta una inscripción por periodo.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={`${style["no-disponible"]}`}>
              Actualmente, ningún taller está activo para inscripciones.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeAlumno;
