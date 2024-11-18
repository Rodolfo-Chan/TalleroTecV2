import { useState } from 'react';
import axios from 'axios';
import style from './descargararchivoreportes.module.css'; 

const DescargarArchivoReportes = ({ fileId, fileType }: { fileId: number; fileType: string }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const downloadFile = async (fileId: number, fileType: string) => {
    try {
      // solicitud GET para descargar el archivo
      const response = await axios.get(`https://drftallerotecdj.onrender.com/talleres/api/reportes/${fileId}/${fileType}/`, {
        responseType: 'blob',
      });

      // enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileType}_${fileId}.pdf`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
      setErrorMessage('El archivo no está disponible.'); 
      setTimeout(() => setErrorMessage(null), 8000); 
    }
  };

  return (
    <div>
      <button
        onClick={() => downloadFile(fileId, fileType)}
        className={style.downloadButton}
      >
        Descargar
      </button>
      
      {errorMessage && (
        <div className={`${style.errorMessage} ${style.showError}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DescargarArchivoReportes;
