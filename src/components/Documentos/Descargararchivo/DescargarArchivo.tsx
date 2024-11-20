import React, { useEffect, useState } from 'react';
import style from './descargararchivo.module.css';

interface FileDownloadComponentProps {
  idAlumno: number; // ID del alumno cuya constancia deseas descargar
  showFileName?: boolean;
  showDownloadText?: boolean; // Permite mostrar u ocultar el texto
  downloadText?: string; // Nueva prop para texto del botón
}

interface Constancia {
  id_constancia: number;
  fecha_emision: string;
  contancia_liberacion: string;
  id_alumno: number;
}

const DescargarArchivo: React.FC<FileDownloadComponentProps> = ({
  idAlumno,
  showFileName = true,
  showDownloadText = true, // Valor por defecto
  downloadText = 'Descargar', // Valor por defecto
}) => {
  const [constancia, setConstancia] = useState<Constancia | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch de la API para obtener las constancias
    fetch('https://drftallerotecdj.onrender.com/talleres/api/constancias_liberacion/')
      .then((response) => response.json())
      .then((data: Constancia[]) => {
        // Filtrar la constancia correspondiente al ID del alumno
        const foundConstancia = data.find((item) => item.id_alumno === idAlumno);
        setConstancia(foundConstancia || null);
      })
      .catch((error) => {
        console.error('Error fetching constancias:', error);
        setErrorMessage('No se pudo cargar la información.');
      });
  }, [idAlumno]);

  const handleDownload = () => {
    if (!constancia) return;

    fetch(constancia.contancia_liberacion, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        setErrorMessage('El archivo aún no está disponible.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        throw new Error('Download failed.');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Constancia_${constancia.id_alumno}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
        setErrorMessage('El archivo no está disponible.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  if (!constancia) {
    return <p className={style['error-message']}>Cargando constancia...</p>;
  }

  return (
    <div className={style['descargar-archivo-container']}>
      <button className={style['download-button']} onClick={handleDownload}>
        {showDownloadText ? downloadText : null} {/* Condición para mostrar el texto del botón */}
        {showFileName && ` Constancia`} {/* Mostrar el nombre del archivo si está habilitado */}
      </button>
      {errorMessage && <p className={style['error-message']}>{errorMessage}</p>}
    </div>
  );
};

export default DescargarArchivo;
