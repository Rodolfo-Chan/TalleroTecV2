import React, { useEffect, useState } from 'react';
import style from './SelectorDocumentoConstanciaAlumno.module.css';

interface File {
    id_constancia: number;
    contancia_liberacion: string | null;
    id_alumno: number;
}

interface SelectorDocumentoConstanciaAlumnoProps {
    userId: string;
}

const SelectorDocumentoConstanciaAlumno: React.FC<SelectorDocumentoConstanciaAlumnoProps> = ({ userId }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    // Fetch files from the API, filtered by userId
    const fetchFiles = async () => {
        try {
            const response = await fetch(`https://drftallerotecdj.onrender.com/talleres/api/constancias_liberacion/`);
            const data: File[] = await response.json();
            
            // Filtrar los archivos obtenidos para que solo se muestren los del alumno actual
            const filteredFiles = data.filter(file => file.id_alumno.toString() === userId);
            setFiles(filteredFiles);
        } catch (err) {
            console.error('Error al obtener archivos:', err);
            setError('Error al cargar archivos');
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [userId]);

    // Extract filename from URL
    const getFileNameFromUrl = (url: string | null): string => {
        if (!url) return 'Archivo no disponible';
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    // Download file
    const downloadFile = async (url: string | null) => {
        if (!url) {
            setError('El archivo solicitado no está disponible.');
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    setError('Archivo no encontrado. Verifica la URL o comunícate con el administrador.');
                } else {
                    setError(`Error al descargar el archivo. Código de estado: ${response.status}`);
                }
                throw new Error('Error al descargar el archivo');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = getFileNameFromUrl(url);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            setError(null);
        } catch (err) {
            console.error('Error de descarga:', err);
            setError('Hubo un problema al descargar el archivo. Por favor, intenta de nuevo.');
        }
    };

    // Handle delete action
    const handleDelete = async (fileId: number) => {
        setIsDeleting(fileId);
        try {
            const response = await fetch(`https://drftallerotecdj.onrender.com/talleres/api/constancias_liberacion/${fileId}/`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar el archivo');

            console.log(`Archivo con ID ${fileId} eliminado correctamente`);
            fetchFiles();
        } catch (error) {
            console.error('Delete Error:', error);
            setError('Error al eliminar el archivo. Por favor, intenta de nuevo.');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className={`${style['container']}`}>
            <h2 className={`${style['title']}`}>Documentos Entregados</h2>
            {error && <p className={`${style['error-text']}`}>{error}</p>}
            {files.length === 0 ? (
                <p className={`${style['no-files-text']}`}>Envio de constancia pendiente para este alumno.</p>
            ) : (
                <ul className={`${style['file-list']}`}>
                    {files.map((file) => (
                        <li key={file.id_constancia} className={`${style['file-item']}`}>
                            <div className={`${style['file-info']}`}>
                                {file.contancia_liberacion && (
                                    <button
                                        onClick={() => downloadFile(file.contancia_liberacion)}
                                        className={`${style['file-link']}`}
                                    >
                                        {getFileNameFromUrl(file.contancia_liberacion)}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(file.id_constancia)}
                                disabled={isDeleting === file.id_constancia}
                                className={`${style['delete-button']}`}
                            >
                                {isDeleting === file.id_constancia ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectorDocumentoConstanciaAlumno;
