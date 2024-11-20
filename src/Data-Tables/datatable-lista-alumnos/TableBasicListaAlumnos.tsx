import { useState, useEffect } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-lista-alumnos/tablebasic-lista-alumnos.module.css";
import axios from "axios";

// Tipos de datos
type Alumno = {
  id_alumno: number;
  matricula_alumno: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  genero: string;
  carrera: string;
};

type Inscripcion = {
  id_inscripcion: number;
  estatus: string;
  id_alumno: number;
  id_taller_registro: number;
};

const TableBasicListaAlumnos = () => {
  const [data, setData] = useState<Alumno[]>([]);

  useEffect(() => {
    // Primero obtenemos las inscripciones para el taller con id_taller_registro 56
    axios.get("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/")
      .then((response) => {
        const inscripciones: Inscripcion[] = response.data.filter((inscripcion: Inscripcion) => inscripcion.id_taller_registro === 56);
        const idsAlumnos = inscripciones.map((inscripcion: Inscripcion) => inscripcion.id_alumno);

        // Obtenemos los datos de los alumnos con esos ids
        const alumnoRequests = idsAlumnos.map((idAlumno: number) =>
          axios.get(`https://drftallerotecdj.onrender.com/talleres/api/alumnos/${idAlumno}/`)
        );

        // Hacemos todas las solicitudes de alumnos en paralelo
        Promise.all(alumnoRequests)
          .then((responses) => {
            const alumnosData = responses.map((response) => response.data);
            setData(alumnosData); // Actualizamos los datos en el estado
          })
          .catch((error) => {
            console.error("Error al obtener los datos de los alumnos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener las inscripciones:", error);
      });
  }, []);

  const columns = [
    {
      name: "Matricula",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Nombre",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Telefono",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Genero",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Carrera",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
  ];

  const muiTableLocalization = {
    filter: {
      all: "Todos",
      title: "Filtros",
      reset: "Restablecer",
    },
    viewColumns: {
      title: "Columnas",
      titleAria: "Ver u ocultar columnas de la tabla",
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar alumno",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar Tabla",
    },
  };

  const options = {
    filterType: "checkbox" as FilterType,
    responsive: "standard" as Responsive,
    sort: false,
    print: false,
    filter: true,
    download: false,
    viewColumns: false,
    selectableRows: "none" as const,
    pagination: true,
    rowsPerPage: 35,
    rowsPerPageOptions: [15, 20, 25],
    textLabels: muiTableLocalization,
  };

  return (
    <div className={`${style["table"]}`}>
      <div className={`${style["border"]}`}>
        <MUIDataTable
          title={"Lista de alumnos inscritos"}
          data={data.map((alumno) => [
            alumno.matricula_alumno,
            `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
            alumno.telefono,
            alumno.genero,
            alumno.carrera,
          ])}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default TableBasicListaAlumnos;
