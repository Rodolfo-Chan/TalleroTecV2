import React from 'react';
import '../components/styles.css'; // Asegúrate de que la ruta sea correcta
// import Button from '../components/Button/Button';
// import { useNavigate } from "react-router-dom";
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
import DescargarArchivo from '../components/Documentos/Descargararchivo/DescargarArchivo';

const About: React.FC = () => {
  // const navigate = useNavigate();

  // Función para manejar la subida de archivos
  const handleFileUpload = (formData: FormData) => {
    // Aquí haces la llamada a la API para subir el archivo
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log('Archivo subido:', data))
      .catch(error => console.error('Error al subir el archivo:', error));
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1>Entrega de documentación</h1>
        </div>
      </header>

      <main className="main-content">
        <section className="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Evaluación al desempeño</h2>
                <p>Solo se aceptan documentos en formato PDF</p>


                {/* Componente para subir archivos */}
                <SubirArchivo onUpload={handleFileUpload} />
                <br />
                <p>Descarga la rúbrica</p>

                {/* Componente para descargar archivos */}
                <DescargarArchivo
                  fileName="example.pdf"
                  downloadUrl="/api/files/example.pdf"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <h2>Registro de participantes</h2>
                <p>Solo se aceptan documentos en formato PDF</p>


                {/* Componente para subir archivos */}
                <SubirArchivo onUpload={handleFileUpload} />
                <br />
                <p>Descarga la rúbrica</p>

                {/* Componente para descargar archivos */}
                <DescargarArchivo
                  fileName="example.pdf"
                  downloadUrl="/api/files/example.pdf"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="table-section">
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
        </section> */}
      </main>
    </div>
  );
};

export default About;
