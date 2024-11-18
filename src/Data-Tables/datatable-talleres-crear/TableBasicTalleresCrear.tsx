import { useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-talleres/tablebasic-talleres.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ModalHOC from "../../components/Modal/Modal";
// import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit } from '@mui/icons-material';
import ButtonModal from "../../components/ButtonModal/ButtonModal";
import axios from "axios";


// Define las interfaces para los datos
interface TallerCrear {
  id_taller_catalogo:number;
  nombre_taller: string;
  estatus_taller: boolean;
}

interface TallerCrearTable {
  id: number;
  Taller: string;
  Estatus: string;
}


const TableBasicTalleresCrear = () => {
  const [showModal, setShowModal] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<TallerCrearTable[]>([]);


  // const handleDelete = (userId: number) => {
  //   setSelectedUserId(userId)
  //   setShowModal(true);
  // };


  // const handleConfirmDelete = async () => {
  //   if (selectedUserId) {
  //     try {
  //       await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/${selectedUserId}/`);

  //       const updatedData = data.filter(user => user.id !== selectedUserId);
  //       setData(updatedData);
  //       setShowModal(false);
  //     } catch (error) {
  //       console.error("Error al eliminar el taller", error);
  //     }
  //   }
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
       name: "Estatus",
       options: {
         setCellProps: () => ({ style: { textAlign: 'center' } }),
         setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
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

              {/* <ButtonDelete
                onClick={() => handleDelete(userId)}
               // label="Eliminar"
               // color="#F14307"
                icon={<Delete />}
                tooltip="Eliminar"

              /> */}
            </div>
          );
        },
      },
    },
  ];

  // Efecto para cargar datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TallerCrear[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/");
        const creartalleresData: TallerCrearTable[] = response.data.map((tallercrear) => ({
          id: tallercrear.id_taller_catalogo, // Asignar un ID único
          Taller: tallercrear.nombre_taller,
          Estatus: tallercrear.estatus_taller ? "Activo" : "Inactivo",

        }));
        setData(creartalleresData);
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
      }
    };

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
                onClick={handleConfirmDelete}
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

export default TableBasicTalleresCrear;
