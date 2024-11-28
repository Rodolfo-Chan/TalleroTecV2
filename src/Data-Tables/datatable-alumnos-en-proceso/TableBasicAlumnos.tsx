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
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<AlumnoTable[]>([]); // Usa la interfaz AlumnoTable

  // const handleDelete = (userId: number) => {
  //   // ... your delete logic here
  // };

  // const handleConfirmDelete = async () => {
  //   // ... your confirm delete logic here
  // };

  const columns = [
    {
      name: "Matricula",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    // ... other columns
    {
      name: "Opción",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
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
    // ... your data fetching logic here
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    filterType: "checkbox" as FilterType,
    responsive: "standard" as Responsive,
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