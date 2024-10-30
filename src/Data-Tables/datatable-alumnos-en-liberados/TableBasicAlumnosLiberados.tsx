import { useState } from "react";
import MUIDataTable, { FilterType, Responsive } from "mui-datatables";
import style from "./tablebasic-alumnos-liberados.module.css";
import { Link } from "react-router-dom";

import ButtonConstancia from "../../components/Documentos/Constancia/ButtonConstancia";



import FileOpenIcon from '@mui/icons-material/FileOpen';

const TableBasicAlumnosLiberados = () => {





  const columns = [
    {
      name: "Matricula",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
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
      name: "Genero",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Carrera",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Puntos",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
      },
    },
    {
      name: "Constancia",
      options: {
        setCellProps: () => ({ style: { textAlign: 'center' } }),
        setCellHeaderProps: () => ({ style: { textAlign: 'center', fontWeight: 'bold' } }),
        customBodyRenderLite: (dataIndex: number) => {
          const userId = data[dataIndex].id;
          return (
<div className ={`${style['buton-crud']}`}>



      <Link to={`/AlumnosLiberados/ConstanciaAlumno/${userId}`}>
    <ButtonConstancia
      onClick={() => {
        console.log("presionado para la constancia");
      }}
      icon={<FileOpenIcon />}
      tooltip="Constancia"
    />
  </Link>
</div>
          );
        },
      },
    },
  ];

  const [data] = useState([
    /* Datos de los alumnos */
    {
      id:1,
      Matricula: "20890344",
      Nombre: "Juan Sanchez",
      Apellidos: "Perez Ancona",
      Telefono: "1234567890",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
    },
    {
      id:2,
      Matricula: "67836325",
      Nombre: "Alberto Antonio",
      Apellidos: "Puc Santos",
      Telefono: "9872561528",
      Genero: "Masculino",
      Carrera: "LIC. Administracion",
      Puntos:"200/200",
    },
    {
      id:3,
      Matricula: "22367534",
      Nombre: "Juan Sanchez",
      Apellidos: "Perez Ancona",
      Telefono: "1234567890",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
    },
    {
      id:4,
      Matricula: "45678976",
      Nombre: "Saul Antonio",
      Apellidos: "Ake Baas",
      Telefono: "8972628910",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
    },
    {
      id:5,
      Matricula: "91452678",
      Nombre: "Andrea Cecilia",
      Apellidos: "Ramirez Nauat",
      Telefono: "1234567890",
      Genero: "Femenino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
    },
    {
      id:6,
      Matricula: "81035276",
      Nombre: "Maria Jose",
      Apellidos: "Cime Pech",
      Telefono: "1123098160",
      Genero: "Femenino",
      Carrera: "ING. Agronomia",
      Puntos:"200/200",
    },
    {
      id:7,
      Matricula: "09362784",
      Nombre: "Cesar Guzman",
      Apellidos: "Noh Sanchez",
      Telefono: "1234234509",
      Genero: "Masculino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
    },
    {
      id:8,
      Matricula: "262541628",
      Nombre: "Dalia Rosario",
      Apellidos: "May Cupul",
      Telefono: "1715431098",
      Genero: "Femenino",
      Carrera: "ING. Informatica",
      Puntos:"200/200",
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
          title={"Lista de alumnos liberados"}
          data={data}
          columns={columns}
          options={options}
        />

      </div>
    </div>
  );
};

export default TableBasicAlumnosLiberados;
