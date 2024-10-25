import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import style from './pdfgenerador.module.css'; // Importa el módulo CSS

const PdfGenerador = () => {
    const [estudiantes, setEstudiantes] = useState<{ nombre: string; calificaciones: number[]; nivelDesempeño: string; valorNumerico: number }[]>([
        { nombre: 'Juan Pérez Pech Cante', calificaciones: Array(7).fill(0), nivelDesempeño: '', valorNumerico: 0 },
        { nombre: 'María Rosario López Balan', calificaciones: Array(7).fill(0), nivelDesempeño: '', valorNumerico: 0 },
        { nombre: 'Carlos Alberto Sánchez Perez', calificaciones: Array(7).fill(0), nivelDesempeño: '', valorNumerico: 0 },
        { nombre: 'Ana Luna Torres Estrella', calificaciones: Array(7).fill(0), nivelDesempeño: '', valorNumerico: 0 },
    ]);
    
    const [actividadComplementaria, setActividadComplementaria] = useState('');
    const [periodoRealizacion, setPeriodoRealizacion] = useState('');
    const [oficinaPromocion, setOficinaPromocion] = useState('');
    
    const handleInputChange = (index: number, tipo: 'calificacion' | 'nivelDesempeño', subIndex?: number, value?: string): void => {
        setEstudiantes(prevEstudiantes => {
            const updatedEstudiantes = [...prevEstudiantes];

            if (tipo === 'calificacion' && subIndex !== undefined) {
                const newValue = parseFloat(value || '0') || 0; // Convertir a número
                updatedEstudiantes[index].calificaciones[subIndex] = newValue;

                // Calcular la suma total de las calificaciones
                const total = updatedEstudiantes[index].calificaciones.reduce((acc, val) => acc + val, 0);
                updatedEstudiantes[index].valorNumerico = total; // Asignar la suma al campo valor numérico
                updatedEstudiantes[index].nivelDesempeño = calcularNivelDesempeño(total); // Actualizar el nivel de desempeño
            } else if (tipo === 'nivelDesempeño') {
                updatedEstudiantes[index].nivelDesempeño = value || '';
            }

            return updatedEstudiantes;
        });
    };

    const calcularNivelDesempeño = (valorNumerico: number): string => {
        if (valorNumerico >= 0 && valorNumerico < 3.5) {
            return 'Insuficiente';
        } else if (valorNumerico >= 3.5 && valorNumerico < 10.5) {
            return 'Suficiente';
        } else if (valorNumerico >= 10.5 && valorNumerico < 17.5) {
            return 'Bueno';
        } else if (valorNumerico >= 17.5 && valorNumerico < 24.5) {
            return 'Notable';
        } else if (valorNumerico >= 24.5 && valorNumerico <= 28) {
            return 'Excelente';
        }
        return '';
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/; // Permitir solo dígitos
        if (!regex.test(event.key)) {
            event.preventDefault(); // Evitar el ingreso de caracteres no permitidos
        }
    };

    const generarPDF = (): void => {
        const input = document.getElementById('pdf-content');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                // Cambiar a orientación horizontal
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter', putOnlyUsedFonts: true });
                const imgWidth = 270; // Ancho máximo para tamaño carta en horizontal
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                // Centrar imagen en el PDF
                const xOffset = (pdf.internal.pageSize.width - imgWidth) / 2;

                pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('evaluacion_estudiantes.pdf');
            });
        } else {
            console.error('El elemento con id "pdf-content" no se encontró.');
        }
    };

    return (
        <div className={style['home-container']}>
            <h1>Evaluación de Estudiantes</h1>
            <div id="pdf-content" className={style['home-container']}>
                <div className={style.header}>
                    <h2>INSTITUTO TECNOLOGICO DE TIZIMÍN</h2>
                    <h3>SUBDIRECCIÓN DE PLANEACIÓN Y VINCULACIÓN</h3>
                    <h3>DEPARTAMENTO DE ACTIVIDADES EXTRAESCOLARES</h3>
                    <h3>
                        OFICINA DE PROMOCIÓN 
                        <input
                            type="text"
                            value={oficinaPromocion}
                            onChange={(e) => setOficinaPromocion(e.target.value)}
                            className={style['input-field']}
                        />
                    </h3>
                    <h3>
                        Actividad complementaria: 
                        <input
                            type="text"
                            value={actividadComplementaria}
                            onChange={(e) => setActividadComplementaria(e.target.value)}
                            className={style['input-field']}
                        />
                    </h3>
                    <h3>
                        Periodo de realización: 
                        <input
                            type="text"
                            value={periodoRealizacion}
                            onChange={(e) => setPeriodoRealizacion(e.target.value)}
                            className={style['input-field']}
                        />
                    </h3>
                </div>
                
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style['titulocolumna']}>No.</th>
                            <th>Nombre del Estudiante</th>
                            <th>Cumple en tiempo y forma con las actividades encomendadas alcanzando los objetivos.</th>
                            <th>Trabaja en equipo y se adapta a nuevas situaciones.</th>
                            <th>Muestra liderazgo en las actividades encomendadas.</th>
                            <th>Organiza su tiempo y trabaja de manera proactiva.</th>
                            <th>Interpreta la realidad y se sensibiliza aportando soluciones a la problemática con la actividad complementaria.</th>
                            <th>Realiza sugerencias innovadoras para beneficio o mejora del programa en el que participa.</th>
                            <th>Tiene iniciativa para ayudar en las actividades encomendadas y muestra espíritu de servicio.</th>
                            <th>VALOR NUMERICO DE LA ACTIVIDAD</th>
                            <th>NIVEL DE DESEMPEÑO ALCANZADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map((estudiante, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Numeración automática */}
                                <td>{estudiante.nombre}</td>
                                {estudiante.calificaciones.map((calificacion, subIndex) => (
                                    <td key={subIndex}>
                                        <input
                                            type="text"
                                            className={style['calificacion-input']}
                                            value={calificacion}
                                            onChange={(e) => handleInputChange(index, 'calificacion', subIndex, e.target.value)}
                                            onKeyPress={handleKeyPress} // Evitar caracteres no permitidos
                                        />
                                    </td>
                                ))}
                                <td>{estudiante.valorNumerico}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={style['input-desempeño']}
                                        value={estudiante.nivelDesempeño}
                                        onChange={(e) => handleInputChange(index, 'nivelDesempeño', undefined, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generarPDF} className={style['generate-button']}>Generar PDF</button>
        </div>
    );
};

export default PdfGenerador;
