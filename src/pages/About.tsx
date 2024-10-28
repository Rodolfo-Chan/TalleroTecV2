import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
import { FcGoogle } from 'react-icons/fc';

const About: React.FC = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1>Lista de alumnos del taller</h1>
        </div>
        <div>
          <p>
          <FcGoogle /> rodolfochan2910sss@gmail.com
          </p>
        </div>
      </header>
      <main className="main-content">
        <section className="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Total Perissssodos</h2>
                <p>200</p>
              </div>
              {/* Puedes agregar un ícono aquí si lo deseas */}
            </div>
          </div>
          {/* Agrega más tarjetas según sea necesario */}
        </section>
        <section className="table-section">
          <h2>Tabla de Periodos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan</td>
                <td>28</td>
                <td>Ciudad de México</td>
              </tr>
              <tr>
                <td>María</td>
                <td>34</td>
                <td>Guadalajara</td>
              </tr>
              <tr>
                <td>Carlos</td>
                <td>22</td>
                <td>Monterrey</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default About;