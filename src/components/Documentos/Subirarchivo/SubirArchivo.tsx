import React, { useState } from 'react';
import style from './subirarchivo.module.css';

interface FileUploadComponentProps {
  onUpload: (formData: FormData) => Promise<boolean>; // Cambiamos onUpload para manejar promesas
}

const SubirArchivo: React.FC<FileUploadComponentProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | 'warning' | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];

      // Confirmar si el archivo anterior debe ser reemplazado
      if (selectedFile) {
        const confirmOverwrite = window.confirm(`¿Está seguro de que desea reemplazar "${selectedFile.name}" con "${newFile.name}"?`);
        if (!confirmOverwrite) return; // Si el usuario cancela, no hacer nada
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

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Intentamos subir el archivo y capturamos el resultado
    const uploadSuccess = await onUpload(formData);
    if (uploadSuccess) {
      setAlertMessage('¡El archivo se cargó correctamente!');
      setAlertType('success');
      setSelectedFile(null); // Limpiar el archivo seleccionado después de la carga
    } else {
      setAlertMessage('Error al subir el archivo.');
      setAlertType('error');
    }
  };

  return (
    <div className={style['subir-archivo-container']}>
      <input
        type="file"
        accept=".pdf, .doc, .docx" // Aceptar PDF y Word
        className={style['input-file']}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p className={style['selected-file']}>
          Archivo seleccionado: <strong>{selectedFile.name}</strong>
        </p>
      )}
      <button className={style['upload-button']} onClick={handleUpload}>
        Subir Archivo
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
