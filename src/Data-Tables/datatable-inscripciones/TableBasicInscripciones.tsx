import React, { useState } from "react";
import MUIDataTable, { FilterType } from "mui-datatables";
import style from "../datatable-inscripciones/tablebasic-inscripciones.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ButtonUpdate from "../../components/button-options-CRUD/button-update/ButtonUpdate";
import ButtonDelete from "../../components/button-options-CRUD/button-delete/ButtonDelete";
import ModalHOC from "../../components/modal/Modal";
import ButtonModal from "../../components/button-modal/ButtonModal";
import { Edit, Delete } from '@mui/icons-material'; // Importa los iconos Edit y Delete

const TableBasicInscripciones = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleDelete = (userId: number) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedData = data.filter(user => user.id !== selectedUserId);
    setData(updatedData);
    setShowModal(false);
  };

  const columns = [
    {
      name: "Matricula Alumno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Nombre Alumno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Apellidos Alumno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Taller",
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
      name: "Estatus",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Opciones",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
            <div>
              <Link to={`/Inscripciones/FromInscripcionesActualizar/${userId}`}>
                <ButtonUpdate
                  onClick={() => {
                    console.log("presionado para editar");
                  }}
                  //label="Editar"
                 // color="#C1D00D"
                  icon={<Edit />}
                  tooltip="Editar"
                />
              </Link>
              <span style={{ margin: "0 5px" }}></span>
              <ButtonDelete
                onClick={() => handleDelete(userId)}
               // label="Eliminar"
               // color="#F14307"
                icon={<Delete />}
                tooltip="Eliminar"

              />
            </div>
          );
        },
      },
    },
  ];

  const [data, setData] = useState([
    /* Datos de los alumnos */
    {
     id:1,
      "Matricula Alumno": "20890344",
      "Nombre Alumno": "Juan Sanchez",
      "Apellidos Alumno": "Perez Ancona",
      Taller: "Softball varonil",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",
    },
    {
      id:2,
      "Matricula Alumno": "67836325",
      "Nombre Alumno": "Alberto Antonio",
      "Apellidos Alumno": "Puc Santos",
      Taller: "Ajedrez",
      "Periodo Escolar": "AGO-DIC/2022",
      Estatus: "Completado",
    },
    {
     id:3,
     "Matricula Alumno": "22367534",
     "Nombre Alumno":  "Juan Sanchez",
      "Apellidos Alumno": "Perez Ancona",
      Taller: "Hanal-Pixan",
      "Periodo Escolar": "AGO-DIC/2019",
      Estatus: "Incompleto",
    },
    {
      id:4,
      "Matricula Alumno": "45678976",
     "Nombre Alumno":  "Saul Antonio",
      "Apellidos Alumno": "Ake Baas",
      Taller: "Basquetball",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",
    },
    {
      id:5,
      "Matricula Alumno":"91452678",
     "Nombre Alumno":  "Andrea Cecilia",
      "Apellidos Alumno": "Ramirez Nauat",
      Taller: "Beisball",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",

    },
    {id:6,
     "Matricula Alumno": "81035276",
     "Nombre Alumno":  "Maria Jose",
      "Apellidos Alumno": "Cime Pech",
      Taller: "Futball Femenil",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",

    },
    {
      id:7,
      "Matricula Alumno":"09362784",
     "Nombre Alumno":  "Cesar Guzman",
      "Apellidos Alumno": "Noh Sanchez",
      Taller: "Ajedrez",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",

    },
    {
      id:8,
      "Matricula Alumno": "262541628",
     "Nombre Alumno":  "Dalia Rosario",
      "Apellidos Alumno": "May Cupul",
      Taller: "Basqueball Femenil",
      "Periodo Escolar": "AGO-DIC/2024",
      Estatus: "En progreso",
    }
  ]);

  const options = {
    filterType: "checkbox" as FilterType,
    sort: false,
    print:false,
    filter:true,
    download:true,
    viewColumns:false,
    
    textLabels: {
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar Inscripción",
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
          title={"Lista de Inscripciones"}
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
          <div className ={`${style['info-modal']}`}>
            <p>
              ¿Estás seguro de eliminar este alumno?
            </p>
            <div className ={`${style['button-modal']}`}>
              <ButtonModal
                onClick={() => {
                  handleConfirmDelete();
                }}
                label="Si, eliminar"
              />
              <span style={{ margin: "0 5px" }}></span>
              <ButtonModal
                onClick={() => setShowModal(false)}
                label="Cancelar"
              />
            </div>
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicInscripciones;
