import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdLogout, MdOutlineSportsKabaddi, MdAppRegistration,
  MdOutlineSports, MdExpandMore, MdExpandLess,
} from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { SiHomeassistant } from 'react-icons/si';
import { GiSportMedal } from 'react-icons/gi';
import { FaUsers, FaUserClock, FaUserCheck } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';
import { ImFilesEmpty } from 'react-icons/im';
import { LuFileSignature } from 'react-icons/lu';

import '../components/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // Limpiar el localStorage
    toggleSidebar(); // Cerrar el sidebar
    setIsModalOpen(false); // Cerrar el modal
  };

  const [isTalleresOpen, setIsTalleresOpen] = useState(false);
  const [isAlumnosOpen, setIsAlumnosOpen] = useState(false);

  // Recuperar nivel de acceso del localStorage
  const accessLevel = localStorage.getItem('accessLevel') || '1'; // Nivel 1 por defecto

  const toggleTalleresSubMenu = () => setIsTalleresOpen(!isTalleresOpen);
  const toggleAlumnosSubMenu = () => setIsAlumnosOpen(!isAlumnosOpen);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoIosArrowBack />
      </button>
      <nav>
        <ul>
          {/* Nivel 3: Administradores */}
          {accessLevel === '3' && (
            <>
              <li>
                <hr />
                <Link
                  to="/Home"
                  className={currentPath === '/Home' ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <SiHomeassistant /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={currentPath.startsWith('/Alumnos') ? 'active' : ''}
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
                  to="#"
                  className={currentPath.startsWith('/Talleres') ? 'active' : ''}

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
                  to="/Profesores"
                  className={currentPath.startsWith('/Profesores') ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <MdOutlineSportsKabaddi /> Profesores
                </Link>
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
                  to="/HomeProfesor"
                  className={currentPath === '/HomeProfesor' ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <SiHomeassistant /> Home profe
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
                  to="/HomeAlumno"
                  className={currentPath === '/HomeAlumno' ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <SiHomeassistant /> Home alumno
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
            </>
          )}

          {/* Nivel 2: Profesores */}
          {accessLevel === '2' && (
            <>
              <li>
                <Link
                  to="/HomeProfesor"
                  className={currentPath === '/HomeProfesor' ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <SiHomeassistant /> Home profe
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
            </>
          )}

          {/* Nivel 1: Alumnos */}
          {accessLevel === '1' && (
            <>
              <li>
                <Link
                  to="/HomeAlumno"
                  className={currentPath === '/HomeAlumno' ? 'active' : ''}
                  onClick={toggleSidebar}
                >
                  <SiHomeassistant /> Home alumno
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
            </>
          )}

          {/* Botón de salir (visible para todos los niveles) */}
          <li>
            <hr />
            <Link
              to="/"
              className={currentPath === '/Login' ? 'active' : ''}
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas salir?')) {
                  localStorage.clear(); // Eliminar contenido del localStorage
                  toggleSidebar(); // Cerrar el sidebar
                }
              }}
            >
              <MdLogout /> Salir
            </Link>

          </li>
          <img src="https://tecuruapan.edu.mx/wp-content/uploads/2022/01/TecNMLineasAzules.png" alt="" className='imagentecnm' />

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
