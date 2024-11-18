import React, { useState, useEffect } from 'react';
import style from './subirarchivo.module.css';

interface FileUploadComponentProps {
  onUpload: (formData: FormData) => Promise<boolean>;
  fieldName: string;  // El nombre del campo que se pasará dinámicamente
}

const SubirArchivo: React.FC<FileUploadComponentProps> = ({ onUpload, fieldName }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success' | 'warning' | null>(null);
  const [loading, setLoading] = useState(false);  // Estado para manejar el loading

  useEffect(() => {
    if (alertMessage) {
      // Configurar el temporizador para borrar el mensaje después de 10 segundos
      const timer = setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 6000);  // 10 segundos

      // Limpiar el temporizador cuando el componente se desmonte o el mensaje cambie
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);  // Solo ejecutar este efecto cuando el mensaje cambie

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

    setLoading(true);  // Activar el loading cuando empiece el proceso de carga

    const formData = new FormData();
    formData.append(fieldName, selectedFile);

    const uploadSuccess = await onUpload(formData);
    if (uploadSuccess) {
      setAlertMessage('¡El archivo se cargó correctamente!');
      setAlertType('success');
      setSelectedFile(null); // Limpiar el archivo seleccionado después de la carga
    } else {
      setAlertMessage('Error al subir el archivo.');
      setAlertType('error');
    }

    setLoading(false);  // Desactivar el loading una vez que se complete el proceso
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
      <button
        className={style['upload-button']}
        onClick={handleUpload}
        disabled={loading}  // Deshabilitar el botón si está en loading
      >
        {loading ? (
          <span className={style['loading-spinner']}></span>  // Mostrar el loader si está en carga
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
