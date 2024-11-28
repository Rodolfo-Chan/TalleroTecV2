import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import style from "./tablebasic-alumnos.module.css";
import { Link } from "react-router-dom";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import ModalHOC from "../../components/Modals/Modals"; // Ajusta la ruta según la ubicación de tu componente


interface Alumno {
  id_alumno: number;
  matricula_alumno: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  genero: string;
  carrera: string;
}

interface Inscripcion {
  id_inscripcion: number;
  estatus: string;
  id_alumno: number;
  id_taller_registro: number;
}

interface Taller {
  id_taller_registro: number;
  puntos_taller: number;
}

interface AlumnoTable {
  id: number;
  Matricula: number;
  Nombre: string;
  Apellidos: string;
  Telefono: string;
  Genero: string;
  Carrera: string;
  Puntos: string;
}

const TableBasicAlumnos = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<AlumnoTable[]>([]);

  const fetchData = async () => {
    try {
      const alumnosResponse = await axios.get<Alumno[]>("https://drftallerotecdj.onrender.com/talleres/api/alumnos/");
      const inscripcionesResponse = await axios.get<Inscripcion[]>("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/");
      const talleresResponse = await axios.get<Taller[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");

      const alumnos = alumnosResponse.data;
      const inscripciones = inscripcionesResponse.data;
      const talleres = talleresResponse.data;

      const puntosTalleres: { [key: number]: number } = {};
      talleres.forEach((taller) => {
        puntosTalleres[taller.id_taller_registro] = taller.puntos_taller;
      });

      const alumnosData: AlumnoTable[] = alumnos
        .map((alumno) => {
          const puntos = inscripciones
            .filter((inscripcion) => inscripcion.id_alumno === alumno.id_alumno && inscripcion.estatus === "Acreditado")
            .reduce((sum, inscripcion) => {
              const puntosTaller = puntosTalleres[inscripcion.id_taller_registro] || 0;
              return sum + puntosTaller;
            }, 0);

          return {
            id: alumno.id_alumno,
            Matricula: alumno.matricula_alumno,
            Nombre: alumno.nombre,
            Apellidos: `${alumno.apellido_paterno} ${alumno.apellido_materno}`,
            Telefono: alumno.telefono,
            Genero: alumno.genero.charAt(0).toUpperCase() + alumno.genero.slice(1),
            Carrera: alumno.carrera,
            Puntos: `${puntos}/200`,
          };
        })
        .filter((alumno) => {
          const [puntosActuales] = alumno.Puntos.split("/").map(Number);
          return puntosActuales < 200;
        });

      setData(alumnosData);
    } catch (error) {
      console.error("Error al obtener los datos de la API", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    filterType: "checkbox" as const,  // Opción de filtro tipo checkbox
    responsive: "standard" as const,  // Estilo de tabla responsive
    sort: false,
    print: false,
    filter: true,
    download: false,
    viewColumns: false,
    textLabels: {
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar alumno",
        filterTable: "Filtrar tabla",
      },
    },
    selectableRows: "none" as const,  // No seleccionar filas
    pagination: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  const columns = [
    { name: "Matricula" },
    { name: "Nombre" },
    { name: "Apellidos" },
    { name: "Telefono" },
    { name: "Genero" },
    { name: "Carrera" },
    { name: "Puntos" },
    {
      name: "Opción",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
            <div className={style["buton-crud"]}>
              <Link to={`/Alumnos/FromAlumnosActualizar/${userId}`}>
                <ButtonUpdate
                  onClick={() => console.log("presionado para editar")}
                  icon={<Edit />}
                  tooltip="Editar"
                />
              </Link>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className={style["table"]}>
      <div className={style["border"]}>
        <MUIDataTable title="Lista de alumnos" data={data} columns={columns} options={options} />
        {showModal && (
          <ModalHOC show={showModal} hide={() => setShowModal(false)} activeHide={false}>
            <div className={style["info-modal"]}>
              <p>¿Estás seguro de eliminar este alumno?</p>
            </div>
          </ModalHOC>
        )}
      </div>
    </div>
  );
};

export default TableBasicAlumnos;

