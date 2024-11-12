import { useState, useEffect } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-alumnos/tablebasic-alumnos.module.css";
import { Link } from "react-router-dom";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ModalHOC from "../../components/Modal/Modal";
import ButtonModal from "../../components/ButtonModal/ButtonModal";
import { Edit, Delete } from '@mui/icons-material';
import axios from "axios";

// Define the type for a student (Alumno)
type Alumno = {
  matricula_alumno: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  genero: string;
  carrera: string;
  semestre: number;
  email: string;
  nivel_acceso: string; // Assuming nivel_acceso will be stored as a string label for display
};

const TableBasicAlumnos = () => {
  const [data, setData] = useState<Alumno[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedMatricula, setSelectedMatricula] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://drftallerotecdj.onrender.com/talleres/api/alumnos/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (matricula_alumno: string) => {
    setSelectedMatricula(matricula_alumno);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMatricula === null) return;

    try {
      await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/alumnos/${selectedMatricula}/`);
      setData((prevData) => prevData.filter((user) => user.matricula_alumno !== selectedMatricula));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
      name: "Opciones",
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }),
        setCellHeaderProps: () => ({ style: { textAlign: "center", fontWeight: "bold" } }),
        customBodyRenderLite: (dataIndex: number) => {
          const matricula_alumno = data[dataIndex].matricula_alumno;
          return (
            <div className={style["buton-crud"]}>
              <Link to={`/Alumnos/FromAlumnosActualizar/${matricula_alumno}`}>
                <ButtonUpdate icon={<Edit />} tooltip="Editar" />
              </Link>
              <ButtonDelete onClick={() => handleDelete(matricula_alumno)} icon={<Delete />} tooltip="Eliminar" />
              <Link to={`/Alumnos/FromAlumnosActualizar/${matricula_alumno}`}>
                <ButtonUpdate icon={<Edit />} tooltip="Constancia" />
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox" as FilterType,
    responsive: "standard" as Responsive,
    sort: false,
    print: false,
    filter: true,
    download: true,
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
    <div className={style["table"]}>
      <div className={style["border"]}>
        <MUIDataTable title={"Lista de Alumnos"} data={data} columns={columns} options={options} />
        <ModalHOC show={showModal} hide={() => setShowModal(false)} activeHide={false}>
          <div className={style["info-modal"]}>
            <p>¿Estás seguro de eliminar este alumno?</p>
            <div className={style["button-modal"]}>
              <ButtonModal onClick={handleConfirmDelete} label="Si, eliminar" />
              <span style={{ margin: "0 5px" }}></span>
              <ButtonModal onClick={() => setShowModal(false)} label="Cancelar" />
            </div>
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicAlumnos;
