import React from 'react';
import styles from '../components/Navbar.module.css'; 

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className={styles.navbar}> {/* Usando los estilos como módulo */}
      <div className={styles.logoContainer}> {/* Cambiado a logoContainer */}
        <img 
          src="https://image.spreadshirtmedia.net/image-server/v1/designs/153977143,width=178,height=178.png" 
          alt="Logo" 
          className={styles.logoImg} 
        />
        <h1 className={styles.siteName}>TALLEROTEC</h1>
      </div>
      <button className={styles.menuToggle} onClick={toggleSidebar}>
        &#9776;
      </button>
    </header>
  );
};

export default Navbar;
