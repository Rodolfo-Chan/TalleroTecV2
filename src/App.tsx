import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from '../src/routes';
import './App.css';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <RoutesComponent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </Router>
  );
};

export default App;

