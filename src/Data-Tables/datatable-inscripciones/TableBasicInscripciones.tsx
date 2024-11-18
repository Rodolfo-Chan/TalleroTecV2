import { useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-inscripciones/tablebasic-inscripciones.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../../components/button-options-CRUD/ButtonCrud";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ModalHOC from "../../components/Modal/Modal";
import ButtonModal from "../../components/ButtonModal/ButtonModal";
import { Edit, Delete } from '@mui/icons-material'; // Importa los iconos Edit y Delete
import axios from "axios";
// Definición las interfaces para los datos
interface Inscripcion {
  id_inscripcion: number;
  estatus: string;
  id_taller_registro: number;
  id_alumno: number;
}

interface Alumno {
  id_alumno: number;
  matricula_alumno: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
}

interface Subgrupo {
  id_taller_registro: number;
  periodo_escolar: string;
  id_taller_catalogo: number;
  tipo_taller: string;
}

interface Supergrupo {
  id_taller_catalogo: number;
  nombre_taller: string;
}

interface InscripcionTable {
  id: number;
  "Matricula alumno": number;
  "Nombre alumno": string;
  Taller: string;
  "Periodo escolar": string;
  Estatus: string;
}

const TableBasicInscripciones = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [data, setData] = useState<InscripcionTable[]>([]); // Usa la interfaz

  const handleDelete = (userId: number) => {
    setSelectedUserId(userId)
    setShowModal(true); 
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        // Realiza la solicitud DELETE a la API
        await axios.delete(`https://drftallerotecdj.onrender.com/talleres/api/inscripciones/${selectedUserId}/`);
        
        // Actualiza el estado local para eliminar el alumno
        const updatedData = data.filter(user => user.id !== selectedUserId);
        setData(updatedData);
        setShowModal(false);
      } catch (error) {
        console.error("Error al eliminar la inscripción", error);
        // Puedes mostrar un mensaje de error si lo deseas
      }
    }
  };

  const columns = [
    {
      name: "Matricula alumno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Nombre alumno",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    // {
    //   name: "Apellidos Alumno",
    //   options: {
    //     setCellProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
    //   },
    // },
    {
      name: "Taller",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Periodo escolar",
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
<Link to={`/Inscripciones/FormInscripcionesActualizar/${userId}`}>
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

 // Efecto para cargar datos de la API
 useEffect(() => {
 const fetchData = async () => {
  try {
    const inscripcionesResponse = await axios.get<Inscripcion[]>("https://drftallerotecdj.onrender.com/talleres/api/inscripciones/");
    const alumnosResponse = await axios.get<Alumno[]>("https://drftallerotecdj.onrender.com/talleres/api/alumnos/");
    const subgruposResponse = await axios.get<Subgrupo[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_subgrupos/");
    const supergrupoResponse = await axios.get<Supergrupo[]>("https://drftallerotecdj.onrender.com/talleres/api/talleres_supergrupo/");

    const combinedData = inscripcionesResponse.data.map(inscripcion => {
      const alumno = alumnosResponse.data.find((a: Alumno) => a.id_alumno === inscripcion.id_alumno);
      const subgrupo = subgruposResponse.data.find((s: Subgrupo) => s.id_taller_registro === inscripcion.id_taller_registro);
      const supergrupo = supergrupoResponse.data.find((sg: Supergrupo) => sg.id_taller_catalogo === subgrupo?.id_taller_catalogo);

      return {
        id: inscripcion.id_inscripcion,
        "Matricula alumno": alumno ? Number(alumno.matricula_alumno) : 0,
        "Nombre alumno": alumno ? `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}` : "No asignado",
        Taller: supergrupo ? `${supergrupo.nombre_taller } (${subgrupo?.tipo_taller})` : "No asignado",
        "Periodo escolar": subgrupo ? subgrupo.periodo_escolar : "No asignado",
        Estatus: inscripcion.estatus,
      };
    });

    setData(combinedData);
  } catch (error) {
    console.error("Error al obtener datos de las APIs", error);
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
          title={"Lista de inscripciones"}
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
                onClick={handleConfirmDelete}
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
