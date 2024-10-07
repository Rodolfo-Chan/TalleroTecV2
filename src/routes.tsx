import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Alumnos from './pages/Alumnos';
import Periodos from './pages/Periodos';
import Instruct from './pages/Instruct';
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
        <Route path="/Instruct" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Instruct /></MainLayout>} />
        <Route path="/Periodos" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Periodos /></MainLayout>} />
        <Route path="/about" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}><Contact /></MainLayout>} />
      </Routes>
    </div>
  );
};

export default RoutesComponent;
