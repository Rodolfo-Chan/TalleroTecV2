import React, { useState, useEffect } from 'react';
import style from './subirarchivo.module.css';

interface FileUploadComponentProps {
  onUpload: (formData: FormData) => Promise<boolean>;
  fieldName: string; 
}

const SubirArchivo: React.FC<FileUploadComponentProps> = ({ onUpload, fieldName }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | 'warning' | null>(null);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    if (alertMessage) {
   
      const timer = setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 6000);  // 10 segundos

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];

      // Confirmar si el archivo anterior debe ser reemplazado
      if (selectedFile) {
        const confirmOverwrite = window.confirm(`¿Está seguro de que desea reemplazar "${selectedFile.name}" con "${newFile.name}"?`);
        if (!confirmOverwrite) return; 
      }

      setSelectedFile(newFile);
      setAlertMessage(null);
      setAlertType(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setAlertMessage('¡Primero seleccione un archivo!');
      setAlertType('warning');
      return;
    }

    setLoading(true);  

    const formData = new FormData();
    formData.append(fieldName, selectedFile);

    const uploadSuccess = await onUpload(formData);
    if (uploadSuccess) {
      setAlertMessage('¡El archivo se cargó correctamente!');
      setAlertType('success');
      setSelectedFile(null); 
    } else {
      setAlertMessage('Error al subir el archivo.');
      setAlertType('error');
    }

    setLoading(false);  
  };

  return (
    <div className={style['subir-archivo-container']}>
      <input
        type="file"
        accept=".pdf, .doc, .docx"
        className={style['input-file']}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p className={style['selected-file']}>
          Archivo seleccionado: <strong>{selectedFile.name}</strong>
        </p>
      )}
      <button
        className={style['upload-button']}
        onClick={handleUpload}
        disabled={loading} 
      >
        {loading ? (
          <span className={style['loading-spinner']}></span> 
        ) : (
          'Subir Archivo'
        )}
      </button>
      {alertMessage && (
        <p className={`${style['alert-message']} ${style[alertType ?? '']}`}>
          {alertMessage}
        </p>
      )}
    </div>
  );
};

export default SubirArchivo;
