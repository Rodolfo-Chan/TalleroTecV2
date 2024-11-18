import React, { useEffect, useState } from 'react';
import style from './SelectorDocumentosRubricas.module.css';

interface File {
    id_rubrica_reporte: number;
    registro_de_participantes: string | null;
    evaluacion_desempeno: string | null;
}

const SelectorDocumentosRubricas: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    // Fetch files from the API
    const fetchFiles = async () => {
        try {
            const response = await fetch('https://drftallerotecdj.onrender.com/talleres/api/rubrica_reportes/');
            const data = await response.json();
            setFiles(data);
        } catch (err) {
            console.error('Error al obtener archivos:', err);
            setError('Error al cargar archivos');
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Extract filename from URL
    const getFileNameFromUrl = (url: string | null): string => {
        if (!url) return 'Archivo no disponible';
        const parts = url.split('/');
        return parts[parts.length - 1];  // Devuelve el último segmento como nombre de archivo
    };

    // Download file
    const downloadFile = async (url: string | null) => {
        if (!url) {
            setError('El archivo solicitado no está disponible.');
            return;
        }

        console.log('Intentando descargar archivo desde:', url);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.error('Error de descarga:', response.status);
                if (response.status === 404) {
                    setError('Archivo no encontrado. Verifica la URL o comunícate con el administrador.');
                } else {
                    setError(`Error al descargar el archivo. Código de estado: ${response.status}`);
                }
                throw new Error('Error al descargar el archivo');
            }

            const contentType = response.headers.get('Content-Type');
            if (!contentType?.includes('application/')) {
                setError('El archivo no es compatible para descargar');
                return;
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = getFileNameFromUrl(url);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            setError(null);  // Limpiamos el error si la descarga es exitosa
        } catch (err) {
            console.error('Error de descarga:', err);
            setError('Hubo un problema al descargar el archivo. Por favor, intenta de nuevo.');
        }
    };

    // Handle delete action
    const handleDelete = async (fileId: number) => {
        setIsDeleting(fileId);
        try {
            const response = await fetch(`https://drftallerotecdj.onrender.com/talleres/api/rubrica_reportes/${fileId}/`, {
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

            {/* Mostrar mensaje cuando no haya archivos */}
            {files.length === 0 ? (
                <p className={`${style['no-files-message']}`}>No se ha entregado ningún archivo</p>
            ) : (
                <ul className={`${style['file-list']}`}>
                    {files.map((file) => (
                        <li key={file.id_rubrica_reporte} className={`${style['file-item']}`}>
                            <div className={`${style['file-info']}`}>
                                {file.registro_de_participantes && (
                                    <button
                                        onClick={() => downloadFile(file.registro_de_participantes)}
                                        className={`${style['file-link']}`}
                                    >
                                        {getFileNameFromUrl(file.registro_de_participantes)}
                                    </button>
                                )}
                                {file.evaluacion_desempeno && (
                                    <button
                                        onClick={() => downloadFile(file.evaluacion_desempeno)}
                                        className={`${style['file-link']}`}
                                    >
                                        {getFileNameFromUrl(file.evaluacion_desempeno)}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(file.id_rubrica_reporte)}
                                disabled={isDeleting === file.id_rubrica_reporte}
                                className={`${style['delete-button']}`}
                            >
                                {isDeleting === file.id_rubrica_reporte ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectorDocumentosRubricas;
