import React, { useState } from 'react';
import style from './SubirArchivo.module.css';  // Importa el archivo de estilos

interface FileUploadComponentProps {
  onUpload: (formData: FormData) => void;
}

const SubirArchivo: React.FC<FileUploadComponentProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('¡Primero seleccione un archivo!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    onUpload(formData);
    alert('¡El archivo se cargó correctamente!');
    setSelectedFile(null);
  };

  return (
    <div className={style['subir-archivo-container']}>
      <input
        type="file"
        accept="application/pdf"
        className={style['input-file']}
        onChange={handleFileChange}
      />
      <button className={style['upload-button']} onClick={handleUpload}>
       Subir PDF
      </button>
    </div>
  );
};

export default SubirArchivo;
