import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { SiHomeassistant } from 'react-icons/si';
import '../components/Sidebar.css';
import { MdDateRange, MdLogout, MdOutlineSportsKabaddi } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

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
          
          <li>
            <Link
              to="/Alumnos"
              className={currentPath === '/Alumnos' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <IoPersonAddSharp /> Alumnos
            </Link>
          </li>
          <li>
            <Link
              to="/Instruct"
              className={currentPath === '/Instruct' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <MdOutlineSportsKabaddi /> Intructores
            </Link>
          </li>
          <li>
            <Link
              to="/Periodos"
              className={currentPath === '/Periodos' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <MdDateRange /> Periodos
            </Link>
          </li>

          <hr />
          <li>
            <Link
              to="/contact"
              className={currentPath === '/contact' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <FaEnvelope /> Contact
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={currentPath === '/about' ? 'active' : ''}
              onClick={toggleSidebar}
            >
              <FaInfoCircle /> About
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
