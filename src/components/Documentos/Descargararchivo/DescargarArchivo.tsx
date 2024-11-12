import React from 'react';
import style from './DescargarArchivo.module.css';  // Importa el archivo de estilos

interface FileDownloadComponentProps {
  fileName: string;
  downloadUrl: string;
}

const DescargarArchivo: React.FC<FileDownloadComponentProps> = ({ fileName, downloadUrl }) => {
  const handleDownload = () => {
    fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
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
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };

  return (
    <div className={style['descargar-archivo-container']}>
      <button className={style['download-button']} onClick={handleDownload}>
        Descargar {fileName}
      </button>
    </div>
  );
};

export default DescargarArchivo;
