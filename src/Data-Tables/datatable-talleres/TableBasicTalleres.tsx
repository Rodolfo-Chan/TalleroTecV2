import {useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-talleres/tablebasic-talleres.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ModalHOC from "../../components/Modal/Modal";
import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit, Delete } from '@mui/icons-material'; 
import ButtonModal from "../../components/ButtonModal/ButtonModal";
import axios from "axios";
import DescargarArchivoReportes from "../../components/Documentos/Descargararchivoreportes/DescargarArchivoReportes";
// import DescargarArchivo from "../../components/Documentos/Descargararchivo/DescargarArchivo";

// Definición las interfaces para los datos
interface Subgrupo {
  id_taller_registro: number;
  periodo_escolar: string;
  hora_inicio_12h: string;
  hora_final_12h: string;
  tipo_taller:string;
  ubicacion: string;
  turno_taller: string;
  dias_taller: string;
  id_instructor: number;
  id_taller_catalogo: number;
}

interface Taller {
  id_taller_catalogo: number;
  nombre_taller: string;
}

interface Profesor {
  id_instructor: number;
  nombre: string;
  apellido_paterno:string;
  apellido_materno:string;
}

interface TallerCrearTable {
  id: number;
  Taller: string;
  Profesor: string;
  "Periodo Escolar": string;
  Horario: string;
  Ubicacion: string;
  Turno: string;
}



const TableBasicTalleres = () => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<TallerCrearTable[]>([]); // Usa la interfaz TallereCrearTable
  

  const handleDelete = (userId: number) => {
    setSelectedUserId(userId)
    setShowModal(true); 
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        // Realiza la solicitud DELETE a la API
        await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/${selectedUserId}/`);
        
        const updatedData = data.filter(user => user.id !== selectedUserId);
        setData(updatedData);
        setShowModal(false);
      } catch (error) {
        console.error("Error al eliminar el taller", error);
      }
    }
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
      name: "Horario",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    // {
    //   name: "Ubicacion",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //   },
    // },
    // {
    //   name: "Turno",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //   },
    // },

    {
      name: "Registro de participantes",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const fileId = data[dataIndex].id;
          return (
            <DescargarArchivoReportes
              fileId={fileId}
              fileType="registro_participantes"
            />
          );
        },
      },
    },
    {
      name: "Evaluación al desempeño",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const fileId = data[dataIndex].id;
          return (
            <DescargarArchivoReportes
              fileId={fileId}
              fileType="evaluacion_desempeno"
            />
          );
        },
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
<Link to={`/Talleres/FormTalleresActualizar/${userId}`}>
           <ButtonUpdate
                  onClick={() => {
                    console.log("presionado para editar");
                  }}
                  icon={<Edit />}
                  tooltip="Editar"
                />
              </Link>
            
              <ButtonDelete
                onClick={() => handleDelete(userId)}
                icon={<Delete />}
                tooltip="Eliminar"
              />
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
        // Obtener los datos de los talleres
        const talleresResponse = await axios.get<Taller[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/");
        // Obtener los datos de los instructores
        const profesoresResponse = await axios.get<Profesor[]>("https://drftallerotecdj.onrender.com/talleres/api/instructores/");
        // Obtener los datos de los subgrupos
        const subgruposResponse = await axios.get<Subgrupo[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");

        // Combinar los datos
        const combinedData = subgruposResponse.data.map(subgrupo => {
          // Buscar el taller asociado con el subgrupo
          const taller = talleresResponse.data.find(t => t.id_taller_catalogo === subgrupo.id_taller_catalogo);
          // Buscar el profesor asociado con el subgrupo usando el id_instructor
          const profesor = profesoresResponse.data.find(p => p.id_instructor === subgrupo.id_instructor);

          return {
            id: subgrupo.id_taller_registro,
            Taller: taller ? taller.nombre_taller : "No disponible",
            Tipo: subgrupo.tipo_taller,
            Profesor: profesor ? `${profesor.nombre} ${profesor.apellido_paterno} ${profesor.apellido_materno}` : "No asignado",
            "Periodo Escolar": subgrupo.periodo_escolar,
            Horario: `${subgrupo.hora_inicio_12h} - ${subgrupo.hora_final_12h}`,
            Ubicacion: subgrupo.ubicacion,
            Turno: subgrupo.turno_taller,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

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
          title={"Lista de talleres registrados"}
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
{/** 
            <ButtonModal
                onClick={handleConfirmDelete}
                label="Si, eliminar"
              />
              <span style={{ margin: "0 5px" }}></span>
              <ButtonModal
                onClick={() => setShowModal(false)}
                label="Cancelar"
              />*/}
            </div>
          </div>
        </ModalHOC>
      </div>
    </div>
  );
};

export default TableBasicTalleres;
