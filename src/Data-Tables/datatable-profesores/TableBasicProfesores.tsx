import {useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-profesores/tablebasic-profesores.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../button-options-CRUD/ButtonCrud";
// import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit } from '@mui/icons-material'; 
import ModalHOC from "../../components/Modal/Modal";
import ButtonModal from "../../components/ButtonModal/ButtonModal";
// import DescargarArchivo from "../../components/Documentos/Descargararchivo/DescargarArchivo";
import axios from 'axios';


// Define las interfaces para los datos
interface Profesor {
  id_instructor: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  email: string;
  genero: string;
  estatus: string;

}

interface ProfesorTable {
  id: number;
  Nombre: string;
  Apellidos: string;
  Telefono: string;
  Correo: string;
  Genero: string;
  Estatus: string;
}


const TableBasicProfesores = () => {
  const [showModal, setShowModal] = useState(false); 
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<ProfesorTable[]>([]); // Usa la interfaz ProfesorTable


  // const handleDelete = (userId: number) => {
  //   setSelectedUserId(userId)
  //   setShowModal(true); 
  // };

  // const handleConfirmDelete = async () => {
  //   if (selectedUserId) {
  //     try {
  //       // Realiza la solicitud DELETE a la API
  //       await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/instructores/${selectedUserId}/`);
        
  //       // Actualiza el estado local para eliminar el profesor
  //       const updatedData = data.filter(user => user.id !== selectedUserId);
  //       setData(updatedData);
  //       setShowModal(false);
  //     } catch (error) {
  //       console.error("Error al eliminar al profesor", error);
  //       // Puedes mostrar un mensaje de error si lo deseas
  //     }
  //   }
  // };

  const columns = [
    // {
    //   name: "ID",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //   },
    // },
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
      name: "Correo",
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
      name: "Estatus",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    // {
    //   name: "Registro de participantes",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //     customBodyRenderLite: (dataIndex: number) => {
    //       const fileName = "registro_participantes.pdf";
    //       const downloadUrl = `/path/to/registro_${data[dataIndex].id}.pdf`;
    //       return (
    //         <DescargarArchivo 
    //           fileName={fileName} 
    //           downloadUrl={downloadUrl} 
    //           showDownloadText={true} 
    //           showFileName={false}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "Evaluación al desempeño",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //     customBodyRenderLite: (dataIndex: number) => {
    //       const fileName = "evaluacion_desempeno.pdf";
    //       const downloadUrl = `/path/to/evaluacion_${data[dataIndex].id}.pdf`;
    //       return (
    //         <DescargarArchivo 
    //           fileName={fileName} 
    //           downloadUrl={downloadUrl} 
    //           showDownloadText={true}
    //           showFileName={false}
    //         />
    //       );
    //     },
    //   },
    // },
    {
      name: "Opción",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
<div className ={`${style['buton-crud']}`}>
<Link to={`/Profesores/FromProfesoresActualizar/${userId}`}>
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
        const response = await axios.get<Profesor[]>("https://drftallerotecdj.onrender.com/talleres/api/instructores/");
        const profesoresData: ProfesorTable[] = response.data.map((profesor) => ({
          id: profesor.id_instructor, // Asignar un ID único
          // ID: profesor.id_instructor,
          Nombre: profesor.nombre,
          Apellidos: `${profesor.apellido_paterno} ${profesor.apellido_materno}`,
          Telefono: profesor.telefono,
          Correo: profesor.email,
          Genero: profesor.genero.charAt(0).toUpperCase() + profesor.genero.slice(1), // Capitalizar género
          Estatus: profesor.estatus
        }));
        setData(profesoresData);
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente



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
        search: "Buscar Profesor",
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
          title={"Lista de profesores"}
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
              ¿Estás seguro de eliminar este profesor?
            </p>
            <div className ={`${style['button-modal']}`}>
            {/* <ButtonModal
                onClick={handleConfirmDelete}
                label="Si, eliminar"
              /> */}
            <span style={{ margin: "0 5px" }}></span>
            <ButtonModal
              onClick={() => setShowModal(false)}
              label="Cancelar"/>
            </div>
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicProfesores;
