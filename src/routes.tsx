import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Alumnos from './pages/Alumnos';
import FromAlumnosRegistro from './forms/forms-alumnos/from-alumnos-registro/FormAlumnosRegistro';
import FromAlumnosActualizar from './forms/forms-alumnos/from-alumnos-actualizar/FormAlumnosActualizar';
import Profesores from './pages/Profesores';
import FromProfesoresRegistro from './forms/forms-profesores/from-profesores-registro/FormProesoresRegistro';
import FromProfesoresActualizar from './forms/forms-profesores/from-profesores-actulizar/FormProfesoresActualizar';
import Talleres from './pages/Talleres';
import FormTalleresRegistro from './forms/forms-talleres/from-talleres-registro/FormTalleresRegistro';
import FormTalleresActualizar from './forms/forms-talleres/from-talleres-actualizar/FormTalleresActualizar';
import TalleresCrear from './pages/TalleresCrear';
import FormTalleresCrearRegistro from './forms/forms-talleres-crear/from-talleres_crear-registro/FormTalleresCrearRegistro';
import FormTalleresCrearActualizar from './forms/forms-talleres-crear/from-talleres_crear-actualizar/FormTalleresCrearActualizar';
import Inscripciones from './pages/Inscripciones';
import FormInscripcionesRegistro from './forms/froms-inscrripciones/from-inscripciones-registro/FormInscripcionesRegistro';
import FormInscripcionesActualizar from './forms/froms-inscrripciones/from-inscripciones-actualizar/FormInscripcionesActualizar';
import HomeAlumno from './pages/HomeAlumno';
import FormInscripcionAlumno from './forms/form-registro-talleres-alumnos/FormInscripcionAlumno';
import TallerAlumno from './pages/TallerAlumno';

import Login from './pages/Login';
import MainLayout from './components/HOC/MainLayout';
import './routes.css';



interface RoutesComponentProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const RoutesComponent: React.FC<RoutesComponentProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`transition-container ${isTransitioning ? 'circle-hesitate' : ''}`}>
      <Routes location={location}>
        {/* Ruta de Login sin Navbar ni Sidebar */}
        <Route path="/" element={<Login />} />

        {/* Rutas que requieren MainLayout */}
        <Route path="/Home" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Home /></MainLayout>} />
        <Route path="/Alumnos" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Alumnos /></MainLayout>} />
        <Route path='/Alumnos/FromAlumnosRegistro' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FromAlumnosRegistro/></MainLayout>} />
        <Route path='/Alumnos/FromAlumnosActualizar/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FromAlumnosActualizar/></MainLayout>} />
        <Route path="/Profesores" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Profesores /></MainLayout>} />
        <Route path='/Profesores/FromProfesoresRegistro' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FromProfesoresRegistro/></MainLayout>} />
        <Route path='/Profesores/FromProfesoresActualizar/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FromProfesoresActualizar/></MainLayout>} />
        <Route path="/Talleres" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Talleres /></MainLayout>} />
        <Route path='/Talleres/FormTalleresRegistro' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormTalleresRegistro/></MainLayout>} />
        <Route path='/Talleres/FormTalleresActualizar/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormTalleresActualizar/></MainLayout>} />
        <Route path="/TalleresCrear" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><TalleresCrear /></MainLayout>} />
        <Route path='/TalleresCrear/FormTalleresCrearRegistro' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormTalleresCrearRegistro/></MainLayout>} />
        <Route path="/Inscripciones" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Inscripciones /></MainLayout>} />
        <Route path='/Inscripciones/FormInscripcionesRegistro' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormInscripcionesRegistro/></MainLayout>} />
        <Route path='/Inscripciones/FormInscripcionesActualizar/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormInscripcionesActualizar/></MainLayout>} />
        <Route path='/Talleres/FormTalleresCrearActualizar/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormTalleresCrearActualizar/></MainLayout>} />
        <Route path="/about" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Contact /></MainLayout>} />
        <Route path="/HomeAlumno" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><HomeAlumno /></MainLayout>} />
        <Route path='/HomeAlumno/FormInscripcionAlumno/:userId' element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><FormInscripcionAlumno/></MainLayout>} />
        <Route path="/TallerAlumno" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><TallerAlumno /></MainLayout>} />

      </Routes>
    </div>
  );
};

export default RoutesComponent;
