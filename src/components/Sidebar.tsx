import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdLogout,
  MdOutlineSportsKabaddi,
  MdAppRegistration,
  MdOutlineSports,
  MdExpandMore,
  MdExpandLess
} from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { SiHomeassistant } from 'react-icons/si';
import { GiSportMedal } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
import '../components/Sidebar.css';
import { FaUsers } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { IoCreateOutline, IoPersonAddSharp } from 'react-icons/io5';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
interface MenuItem {
  label: string;
  icon: JSX.Element;
  to: string;
  submenu?: MenuItem[];
}

const MenuItem: React.FC<{ item: MenuItem; toggleSidebar: () => void }> = ({ item, toggleSidebar }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.to);

  return (
    <li>
      <Link to={item.to} className={isActive ? 'active' : ''} onClick={toggleSidebar}>
        {item.icon} {item.label}
      </Link>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const accessLevel = parseInt(localStorage.getItem('accessLevel') || '0', 10);

  const adminMenu: MenuItem[] = [
    { label: 'Home', icon: <SiHomeassistant />, to: '/Home' },
    { label: 'Alumnos', icon: <IoPersonAddSharp />, to: '/Alumnos' },
    { label: 'Profesores', icon: <MdOutlineSportsKabaddi />, to: '/Profesores' },
    {
      label: 'Talleres',
      icon: <MdOutlineSports />,
      to: '/Talleres',
      submenu: [
        { label: 'Registros', icon: <CiViewList />, to: '/Talleres' },
        { label: 'Crear taller', icon: <IoCreateOutline />, to: '/TalleresCrear' },
      ],
    },
    { label: 'Inscripciones', icon: <MdAppRegistration />, to: '/Inscripciones' },
  ];

  const profesorMenu: MenuItem[] = [
    { label: 'Home Prof', icon: <SiHomeassistant />, to: '/HomeProfesor' },
    { label: 'Documentos', icon: <FaListCheck />, to: '/Documentos' },
  ];

  const alumnoMenu: MenuItem[] = [
    { label: 'Home Alum', icon: <SiHomeassistant />, to: '/HomeAlumno' },
    { label: 'Talleres Alu', icon: <GiSportMedal />, to: '/TallerAlumno' },
  ];

  const logoutItem: MenuItem = { label: 'Salir', icon: <MdLogout />, to: '/' };

  const menu = [
    ...(accessLevel === 3 ? adminMenu : []),
    ...(accessLevel === 2 ? profesorMenu : []),
    ...(accessLevel === 1 ? alumnoMenu : []),
    logoutItem,
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoIosArrowBack />
      </button>
      <nav>
        <ul>
          {menu.map((item, index) => (
            <MenuItem key={index} item={item} toggleSidebar={toggleSidebar} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar; 
