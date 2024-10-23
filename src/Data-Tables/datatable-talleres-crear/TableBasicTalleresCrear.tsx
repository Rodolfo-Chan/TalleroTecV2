import { useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-talleres/tablebasic-talleres.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ModalHOC from "../../components/Modal/Modal";
import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit, Delete } from '@mui/icons-material'; 

import ButtonModal from "../../components/ButtonModal/ButtonModal";

const TableBasicTalleresCrear = () => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const handleDelete = (userId: number) => {
    setSelectedUserId(userId)
    setShowModal(true); 
  };

  const handleConfirmDelete = () => {
    const updatedData = data.filter(user => user.id !== selectedUserId);
    setData(updatedData);
    setShowModal(false);
  };

  const columns = [
    {
      name: "Taller",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },

    {
      name: "Tipo",
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
<div className ={`${style['buton-crud']}`}>
<Link to={`/Talleres/FormTalleresCrearActualizar/${userId}`}>
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

  {
    id:1,
    Taller: "Banda de guerra",
    Tipo:"Mixto",
    Estatus:"Activo"
  },
  {
    id:2,
    Taller: "Escolta",
    Tipo:"Mixto",
    Estatus:"Activo"
  },
  {
    id:3,
    Taller: "Atletismo",
    Tipo:"Mixto",
    Estatus:"Inactivo"
  },
  {
    id:4,
    Taller: "Beisbol Varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
  },
  {
    id:5,
    Taller: "Basquetbal Femenil",
    Tipo:"Femenil",
    Estatus:"Activo"
  },
  {
    id:6,
    Taller: "Ajedrez",
    Tipo:"Mixto",
    Estatus:"Activo"
  },
  {
    id:7,
    Taller: "Futbol varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
  },
  {
    id:8,
    Taller: "Softbol Varonil",
    Tipo:"Varonil",
    Estatus:"Activo"
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


            <ButtonModal
                onClick={() => {
                  handleConfirmDelete();
                }}
                label="Si, eliminar"
              />

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

export default TableBasicTalleresCrear;
