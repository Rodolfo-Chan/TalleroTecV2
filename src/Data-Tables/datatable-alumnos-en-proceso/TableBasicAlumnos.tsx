import { useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "./tablebasic-alumnos.module.css";
import { Link } from "react-router-dom";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
// import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ModalHOC from "../../components/Modal/Modal";
// import ButtonModal from "../../components/ButtonModal/ButtonModal";
import { Edit } from '@mui/icons-material';
import axios from 'axios';

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

const TableBasicAlumnos = () => {
  const [showModal, setShowModal] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<AlumnoTable[]>([]); // Usa la interfaz AlumnoTable

  // const handleDelete = (userId: number) => {
  //   setSelectedUserId(userId);
  //   setShowModal(true);
  // };

  // const handleConfirmDelete = async () => {
  //   if (selectedUserId) {
  //     try {
  //       // Realiza la solicitud DELETE a la API
  //       await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/alumnos/${selectedUserId}/`);
        
  //       // Actualiza el estado local para eliminar el alumno
  //       const updatedData = data.filter(user => user.id !== selectedUserId);
  //       setData(updatedData);
  //       setShowModal(false);
  //     } catch (error) {
  //       console.error("Error al eliminar el alumno", error);
  //       // Puedes mostrar un mensaje de error si lo deseas
  //     }
  //   }
  // };

  const columns = [
    {
      name: "matricula_alumno",
      label: "Matrícula",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "apellido_paterno",
      label: "Apellido Paterno",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "apellido_materno",
      label: "Apellido Materno",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "telefono",
      label: "Teléfono",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "genero",
      label: "Género",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "carrera",
      label: "Carrera",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "semestre",
      label: "Semestre",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "nivel_acceso",
      label: "Nivel de Acceso",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
      },
    },
    {
      name: "Opción",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (

            <div className={`${style['buton-crud']}`}>
              <Link to={`/Alumnos/FromAlumnosActualizar/${userId}`}>
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

    // Calcular puntos acreditados para cada alumno y filtrar los que tienen menos de 200 puntos
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
      .filter((alumno) => parseInt(alumno.Puntos) < 200); // Filtrar alumnos con menos de 200 puntos

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
    responsive: "standard" as Responsive, 
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
        downloadCsv: "Descargar lista en formato CSV",
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
          title={"Lista de alumnos"}
          data={data}
          columns={columns}
          options={options}
        />
        {/* Modal para confirmar la eliminación */}
        <ModalHOC
          show={showModal}
          hide={() => setShowModal(false)}
          activeHide={false}
        >
          <div className={`${style['info-modal']}`}>
            <p>
              ¿Estás seguro de eliminar este alumno?
            </p>
            {/* <div className={`${style['button-modal']}`}>
              <ButtonModal
                onClick={handleConfirmDelete}
                label="Si, eliminar"
              />
>>>>>>> 8b6eee0a42a95509d02f224fca6cef9993bbafb1:src/Data-Tables/datatable-alumnos-en-proceso/TableBasicAlumnos.tsx
              <span style={{ margin: "0 5px" }}></span>
              <ButtonModal
                onClick={() => setShowModal(false)}
                label="Cancelar"
              />
            </div> */}
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicAlumnos;