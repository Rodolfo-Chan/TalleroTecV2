import {useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "./tablebasic-alumnos-liberados.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ButtonConstancia from "../../components/Documentos/Constancia/ButtonConstancia";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Edit } from '@mui/icons-material';
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";


// Define las interfaces para los datos
interface Alumno {
  id_alumno:number;
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

const TableBasicAlumnosLiberados = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<AlumnoTable[]>([]); // Usa la interfaz AlumnoTable




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
      name: "Apellidos",
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
    {
      name: "Puntos",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Constancia",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
<div className ={`${style['buton-crud']}`}>



      <Link to={`/AlumnosLiberados/ConstanciaAlumno/${userId}`}>
    <ButtonConstancia
      onClick={() => {
        console.log("presionado para la constancia");
      }}
      icon={<FileOpenIcon />}
      tooltip="Constancia"
    />
  </Link>
</div>
          );
        },
      },
    },
    {
      name: "Opción",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
            <div className={`${style['buton-crud']}`}>
              <Link to={`/AlumnosLiberados/FromAlumnosLiberadosActualizar/${userId}`}>
                <ButtonUpdate
                  onClick={() => {
                    console.log("presionado para editar");
                  }}
                  icon={<Edit />}
                  tooltip="Editar"
                />
              </Link>
              {/* <ButtonDelete
                onClick={() => handleDelete(userId)}
                icon={<Delete />}
                tooltip="Eliminar"
              /> */}
            </div>
          );
        },
      },
    },
  ];


 // Función para cargar los datos de la API
 const fetchData = async () => {
  try {
    // Obtener datos de alumnos
    const alumnosResponse = await axios.get<Alumno[]>("https://drftallerotecdj.onrender.com/talleres/api/alumnos/");
    const alumnos = alumnosResponse.data;

    // Obtener datos de inscripciones
    const inscripcionesResponse = await axios.get<Inscripcion[]>("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/");
    const inscripciones = inscripcionesResponse.data;

    // Obtener datos de talleres
    const talleresResponse = await axios.get<Taller[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");
    const talleres = talleresResponse.data;

    // Crear un diccionario de puntos de talleres para acceso rápido
    const puntosTalleres: { [key: number]: number } = {};
    talleres.forEach((taller) => {
      puntosTalleres[taller.id_taller_registro] = taller.puntos_taller;
    });

    // Calcular puntos acreditados para cada alumno y filtrar por aquellos con al menos 200 puntos
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
          Puntos: `${puntos}/200`, // Muestra el total de puntos
        };
      })
      .filter((alumno) => parseInt(alumno.Puntos) >= 200); // Filtrar solo alumnos con 200 puntos o más

    setData(alumnosData);
  } catch (error) {
    console.error("Error al obtener los datos de la API", error);
  }
};

useEffect(() => {
  fetchData();
}, []);


  const options = {
    filterType: "checkbox" as FilterType,
    responsive: "standard" as Responsive, // Usar la enumeración Responsive en lugar de cadena
    sort: false,
    print:false,
    filter:true,
    download:false,
    viewColumns:false,
    
    textLabels: {
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar alumno",
        downloadCsv: "Descargar  lista en formato CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas de la tabla",
      },
      selectedRows: {
        text: "filas(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
    selectableRows: "none" as const,
    pagination: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <div className={`${style["table"]}`}>
      <div className={`${style["border"]}`}>
        <MUIDataTable
          title={"Lista de alumnos liberados"}
          data={data}
          columns={columns}
          options={options}
        />

      </div>
    </div>
  );
};

export default TableBasicAlumnosLiberados;
