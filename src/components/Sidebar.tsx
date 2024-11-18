import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdLogout, MdOutlineSportsKabaddi, MdAppRegistration, MdOutlineSports, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { SiHomeassistant } from 'react-icons/si';
import { GiSportMedal } from "react-icons/gi";
// import { FaListCheck } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { ImFilesEmpty } from "react-icons/im";
import { LuFileSignature } from "react-icons/lu";

import '../components/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Estado para manejar el submenú de Talleres
  const [isTalleresOpen, setIsTalleresOpen] = useState(false);
  const [isAlumnosOpen, setIsAlumnosOpen] = useState(false);


  // Alternar submenú de Talleres
  const toggleTalleresSubMenu = () => {
    setIsTalleresOpen(!isTalleresOpen);
  };

  const toggleAlumnosSubMenu = () => {
    setIsAlumnosOpen(!isAlumnosOpen);
  };

  // Verificar si el path es de alguna opción de Talleres o submenú de Talleres
  const isTalleresActive = currentPath.startsWith('/Talleres');
  const isAlumnosActive = currentPath.startsWith('/Alumnos');


  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoIosArrowBack />
      </button>
      <nav>
        <ul>
          <li>
            <Link
              to="/Home"
              className={currentPath === '/Home' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <SiHomeassistant /> Home
            </Link>
          </li>

          {/* <li>
            <Link
              to="/Alumnos"
              className={currentPath.startsWith('/Alumnos') ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <IoPersonAddSharp /> Alumnos
            </Link>
          </li> */}

              {/* Menú de Alumnos con Submenú */}
<li>
  <Link
    to="#"
    className={isAlumnosActive ? 'active' : ''}
    onClick={toggleAlumnosSubMenu}
  >
    <FaUsers /> Alumnos {isAlumnosOpen ? <MdExpandLess /> : <MdExpandMore />}
  </Link>
  {isAlumnosOpen && (
    <ul>
      <li>
        <Link
          to="/Alumnos"
          className={currentPath === '/Alumnos' ? 'active' : ''}
          onClick={toggleSidebar}
        >
          <FaUserClock /> En proceso
        </Link>
      </li>
      <li>
        <Link
          to="/AlumnosLiberados"
          className={currentPath === '/AlumnosLiberados' ? 'active' : ''}
          onClick={toggleSidebar}
        >
          <FaUserCheck /> Liberados
        </Link>
      </li>
    </ul>
  )}
</li>
          <li>
            <Link
              to="/Profesores"
              className={currentPath.startsWith('/Profesores') ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <MdOutlineSportsKabaddi /> Profesores
            </Link>
          </li>

          {/* Menú de Talleres con Submenú */}
<li>
  <Link
    to="#"
    className={isTalleresActive ? 'active' : ''}
    onClick={toggleTalleresSubMenu}
  >
    <MdOutlineSports /> Talleres {isTalleresOpen ? <MdExpandLess /> : <MdExpandMore />}
  </Link>
  {isTalleresOpen && (
    <ul>
      <li>
        <Link
          to="/Talleres"
          className={currentPath === '/Talleres' ? 'active' : ''}
          onClick={toggleSidebar}
        >
          <CiViewList /> Registros
        </Link>
      </li>
      <li>
        <Link
          to="/TalleresCrear"
          className={currentPath === '/TalleresCrear' ? 'active' : ''}
          onClick={toggleSidebar}
        >
          <IoCreateOutline /> Catalogo
        </Link>
      </li>
    </ul>
  )}
</li>

          <li>
            <Link
              to="/Inscripciones"
              className={currentPath.startsWith('/Inscripciones') ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <MdAppRegistration /> Inscripciones
            </Link>
          </li>

          <li>
            <Link
              to="/DocumentosMaster"
              className={currentPath === '/DocumentosMaster' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <ImFilesEmpty /> Rúbricas
            </Link>
          </li>

          <hr />

          <li>
            <Link
              to="/HomeAlumno"
              className={currentPath === '/HomeAlumno' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <SiHomeassistant /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/TallerAlumno"
              className={currentPath.startsWith('/TallerAlumno') ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <GiSportMedal /> Historial
            </Link>
          </li>

          <hr />

          <li>
            <Link
              to="/HomeProfesor"
              className={currentPath === '/HomeProfesor' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <SiHomeassistant /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/Documentos"
              className={currentPath === '/Documentos' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <LuFileSignature /> Documentos
            </Link>
          </li>

          <hr />

          <li>
            <Link
              to="/"
              className={currentPath === '/Login' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <MdLogout /> Salir
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor del logo en la parte inferior */}
      <div className="logo-container">
        <img src="" alt="Logo" className="sidebar-logo" />
      </div>
    </aside>
  );
};

export default Sidebar;
