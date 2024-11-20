import { useState, useEffect } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-talleres-registro/tablebasic-talleres-registro.module.css";

interface Alumno {
  id_alumno: number;
}

interface Inscripcion {
  id_alumno: number;
  id_taller_registro: number;
  estatus: string;
}

interface Taller {
  id_taller_registro: number;
  nombre_taller: string;
  id_instructor: number;
  periodo_escolar: string;
  ubicacion: string;
  turno_taller: string;
  id_taller_catalogo: number;
}

interface Instructor {
  id_instructor: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
}

interface SupergrupoTaller {
  id_taller_catalogo: number;
  nombre_taller: string;
}


const TableBasicTalleresRegistro = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alumnoRes = await fetch("https://drftallerotecdj.onrender.com/talleres/api/alumnos/5/");
        const alumno: Alumno = await alumnoRes.json();

        const inscripcionesRes = await fetch("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/");
        const inscripciones: Inscripcion[] = await inscripcionesRes.json();
        const alumnoInscripciones = inscripciones.filter(inscripcion => inscripcion.id_alumno === alumno.id_alumno);

        // API de talleres_subgrupos
        const tallerRes = await fetch("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");
        const talleres: Taller[] = await tallerRes.json();

        const profesorRes = await fetch(`https://drftallerotecdj.onrender.com/talleres/api/instructores/`);
        const instructores: Instructor[] = await profesorRes.json();
        const supergrupoRes = await fetch(`https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/`);
        const supergrupoTalleres: SupergrupoTaller[] = await supergrupoRes.json();

        const filas = alumnoInscripciones.map((inscripcion: Inscripcion) => {
          const tallerInscrito = talleres.find((taller: Taller) => taller.id_taller_registro === inscripcion.id_taller_registro);
          const profesor = instructores.find((prof: Instructor) => prof.id_instructor === tallerInscrito?.id_instructor);
          const tallerSupergrupo = supergrupoTalleres.find((taller: SupergrupoTaller) => taller.id_taller_catalogo === tallerInscrito?.id_taller_catalogo);

          return {
            id: alumno.id_alumno,
            Taller: tallerSupergrupo ? tallerSupergrupo.nombre_taller : tallerInscrito?.nombre_taller,
            Profesor: profesor ? `${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}` : "Desconocido",
            "Periodo Escolar": tallerInscrito?.periodo_escolar,
            Ubicación: tallerInscrito?.ubicacion,
            Turno: tallerInscrito?.turno_taller,
            Estatus: inscripcion.estatus,
          };
        });

        setData(filas);
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Taller",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Profesor",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Periodo Escolar",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Ubicación",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Turno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Estatus",
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
      search: "Buscar taller",
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
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    textLabels: muiTableLocalization, 

  };

  return (
    <div className={`${style["table"]}`}>
      <div className={`${style["border"]}`}>
        <MUIDataTable
          title={"Lista de talleres"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default TableBasicTalleresRegistro;
