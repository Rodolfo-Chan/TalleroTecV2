import React, { useState } from 'react';
import style from './descargararchivo.module.css';

interface FileDownloadComponentProps {
  fileName: string;
  downloadUrl: string;
  showFileName?: boolean;
  showDownloadText?: boolean; // Permite mostrar u ocultar el texto
  downloadText?: string; // Nueva prop para texto del botón
}

const DescargarArchivo: React.FC<FileDownloadComponentProps> = ({
  fileName,
  downloadUrl,
  showFileName = true,
  showDownloadText = true, // Valor por defecto
  downloadText = 'Descargar', // Valor por defecto
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = () => {
    fetch(downloadUrl, {
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
        a.download = fileName;
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

  return (
    <div className={style['descargar-archivo-container']}>
      <button className={style['download-button']} onClick={handleDownload}>
        {showDownloadText ? downloadText : null} {/* Condición para mostrar el texto del botón */}
        {showFileName && ` ${fileName}`} {/* Mostrar el nombre del archivo si está habilitado */}
      </button>
      {errorMessage && <p className={style['error-message']}>{errorMessage}</p>}
    </div>
  );
};

export default DescargarArchivo;
