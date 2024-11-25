import { useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "../datatable-profesores/tablebasic-profesores.module.css";
import { Link } from "react-router-dom";
//import ButtonCrud from "../button-options-CRUD/ButtonCrud";
import ButtonDelete from "../../components/Button-Options-CRUD/Button-Delete/ButtonDelete";
import ButtonUpdate from "../../components/Button-Options-CRUD/Button-Update/ButtonUpdate";
import { Edit, Delete } from '@mui/icons-material'; 
import ModalHOC from "../../components/Modal/Modal";
import ButtonModal from "../../components/ButtonModal/ButtonModal";
import DescargarArchivo from "../../components/Documentos/Descargararchivo/DescargarArchivo";

const TableBasicProfesores = () => {
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
      name: "Registro de participantes",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const fileName = "registro_participantes.pdf";
          const downloadUrl = `/path/to/registro_${data[dataIndex].id}.pdf`;
          return (
            <DescargarArchivo 
              fileName={fileName} 
              downloadUrl={downloadUrl} 
              showDownloadText={true} 
              showFileName={false}
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
          const fileName = "evaluacion_desempeno.pdf";
          const downloadUrl = `/path/to/evaluacion_${data[dataIndex].id}.pdf`;
          return (
            <DescargarArchivo 
              fileName={fileName} 
              downloadUrl={downloadUrl} 
              showDownloadText={true}
              showFileName={false}
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
    Nombre: "Juan Sanchez",
    Apellidos: "Perez Ancona",
    Telefono: "1234567890",
    Correo: "juan.perez@example.com",
    Genero: "Masculino"
  },
  {
    id:2,
    Nombre: "Maria Guadalupe",
    Apellidos: "Gonzalez Canche",
    Telefono: "9876543210",
    Correo: "maria.gonzalez@example.com",
    Genero: "Femenino"
  },
  {
    id:3,
    Nombre: "Pedro",
    Apellidos: "Martinez Castro",
    Telefono: "5551234567",
    Correo: "pedro.martinez@example.com",
    Genero: "Masculino"
  },
  {
    id:4,
    Nombre: "Laura Guadalupe",
    Apellidos: "Lopez Martin",
    Telefono: "4445678901",
    Correo: "laura.lopez@example.com",
    Genero: "Femenino"
  },
  {id:5,
    Nombre: "Carlos Antonio",
    Apellidos: "Sanchez Mena",
    Telefono: "3336789012",
    Correo: "carlos.sanchez@example.com",
    Genero: "Masculino"
  },
  {
    id:6,
    Nombre: "Ana",
    Apellidos: "Rodriguez Betancurd",
    Telefono: "2227890123",
    Correo: "ana.rodriguez@example.com",
    Genero: "Femenino"
  },
  {id:7,
    Nombre: "David Gustavo",
    Apellidos: "Hernandez Gamboa",
    Telefono: "6668901234",
    Correo: "david.hernandez@example.com",
    Genero: "Masculino"
  },
  {
    id:8,
    Nombre: "Sofia Leticia",
    Apellidos: "Diaz Mena",
    Telefono: "7779012345",
    Correo: "sofia.diaz@example.com",
    Genero: "Femenino"
  },
  {
    id:9,
    Nombre: "Jose Eduardo",
    Apellidos: "Gomez Cupul",
    Telefono: "8880123456",
    Correo: "eduardo.gomez@example.com",
    Genero: "Masculino"
  },
  {
    id:10,
    Nombre: "Luisa Margarita",
    Apellidos: "Martínez Noh",
    Telefono: "9991234567",
    Correo: "luisa.martinez@example.com",
    Genero: "Femenino"
  },
  {
    id:11,
    Nombre: "Javier Castro",
    Apellidos: "Fernandez Baas",
    Telefono: "1112345678",
    Correo: "javier.fernandez@example.com",
    Genero: "Masculino"
  },
  {
    id:12,
    Nombre: "Paula Alejandra",
    Apellidos: "Ruiz Estrella",
    Telefono: "2223456789",
    Correo: "paula.ruiz@example.com",
    Genero: "Femenino"
  },
  {
    id:13,
    Nombre: "Diego Alberto",
    Apellidos: "Garcia Canche",
    Telefono: "3334567890",
    Correo: "diego.garcia@example.com",
    Genero: "Masculino"
  }
   ]);

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

export default TableBasicProfesores;
