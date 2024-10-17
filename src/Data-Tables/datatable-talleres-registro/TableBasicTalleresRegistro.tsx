import { useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-talleres-registro/tablebasic-talleres-registro.module.css";
// import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ModalHOC from "../../components/Modal/Modal";
// import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
// import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
// import { Edit, Delete } from '@mui/icons-material'; 

import ButtonModal from "../../components/ButtonModal/ButtonModal";

const TableBasicTalleresRegistro = () => {
  const [showModal, setShowModal] = useState(false); 
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  // const handleDelete = (userId: number) => {
  //   setSelectedUserId(userId)
  //   setShowModal(true); 
  // };

  // const handleConfirmDelete = () => {
  //   const updatedData = data.filter(user => user.id !== selectedUserId);
  //   setData(updatedData);
  //   setShowModal(false);
  // };

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

  const [data] = useState([

  {
    id:1,
    Taller: "Banda de guerra",
    ID_Profesor: "01",
    Profesor: "Juan Sanchez",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "09:00 am - 10:30 am",
    Ubicación: "Cancha principal del tec",
    Turno: "Matutino",
    Estatus: "En progreso",

  },
  {
    id:2,
    Taller: "Escolta",
    ID_Profesor: "03",
    Profesor: "Carlos",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "08:00 am - 09:30 am",
    Ubicación: "Cancha principal del tec",
    Turno: "Matutino",
    Estatus: "Completado",
  },
  {
    id:3,
    Taller: "Atletismo",
    ID_Profesor: "06",
    Profesor: "Hernesto Daniel",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "06:00 pm - 08:00 pm",
    Ubicación: "Polifuncional",
    Turno: "Vespertino",
    Estatus: "Completado",

  },
  {
    id:4,
    Taller: "Beisbol Varonil",
    ID_Profesor: "07",
    Profesor: "Carlos Ramon",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",

    Horario: "09:00 am - 10:30 am",
    Ubicación: "Campo del tec",
    Turno: "Matutino",
    Estatus: "Completado",

  },
  {
    id:5,
    Taller: "Basquetbal Femenil",
    ID_Profesor: "02",
    Profesor: "Juan Sanchez",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "09:00 am - 10:30 am",
    Ubicación: "Cancha principal del tec",
    Turno: "Matutino",
    Estatus: "Incompleto",

  },
  {
    id:6,
    Taller: "Ajedrez",
    ID_Profesor: "08",
    Profesor: "Carolina Andrea",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "11:00 am - 12:00 pm",
    Ubicación: "Biblioteca",
    Turno: "Matutino",
    Estatus: "Completado",

  },
  {
    id:7,
    Taller: "Futbol varonil",
    ID_Profesor: "12",
    Profesor: "Alan Abel",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "09:00 am - 10:30 am",
    Ubicación: "Campo del tecnologico",
    Turno: "Matutino",
    Estatus: "Incompleto",

  },
  {
    id:8,
    Taller: "Softbol Varonil",
    ID_Profesor: "10",
    Profesor: "Alejandro Andres",
    /*Apellidos: "Perez Ancona",*/
    "Periodo Escolar": "AGO-DIC/2024",
    Horario: "04:00 pm - 06:30 pm",
    Ubicación: "Campo de la polifuncional",
    Turno: "Vespertino",
    Estatus: "Completado",

  }
 
   ]);

  const options = {
    filterType: "checkbox" as FilterType,
    responsive: "standard" as Responsive, // Usar la enumeración Responsive en lugar de cadena
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
        search: "Buscar Taller",
        downloadCsv: "Descargar CSV",
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
          title={"Lista de talleres"}
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
              ¿Estás seguro de eliminar este taller?
            </p>
            <div className ={`${style['button-modal']}`}>


            {/* <ButtonModal
                onClick={() => {
                  handleConfirmDelete();
                }}
                label="Si, eliminar"
              /> */}

            <span style={{ margin: "0 5px" }}></span>

            <ButtonModal  onClick={() => setShowModal(false)}
            label="Cancelar"/>
            </div>
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicTalleresRegistro;
