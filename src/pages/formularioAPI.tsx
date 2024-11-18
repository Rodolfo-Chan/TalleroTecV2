import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define el tipo de los datos del alumno
interface AlumnoData {
    matricula_alumno: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    genero: string;
    carrera: string;
    semestre: number;
    email: string;
    contraseña: string;
    nivel_acceso: number;
}

// Define el tipo de los props del componente
interface FormularioAPIProps {
    matricula: string;
}

const FormularioAPI: React.FC<FormularioAPIProps> = ({ matricula }) => {
    const [alumnoData, setAlumnoData] = useState<AlumnoData>({
        matricula_alumno: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        genero: '',
        carrera: '',
        semestre: 0,
        email: '',
        contraseña: '',
        nivel_acceso: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAlumnoData = async () => {
            try {
                const response = await axios.get<AlumnoData>(`https://drftallerotecdj.onrender.com/talleres/api/alumnos/${matricula}/`);
                setAlumnoData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos del alumno.');
                setLoading(false);
            }
        };

        fetchAlumnoData();
    }, [matricula]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAlumnoData({ ...alumnoData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`https://drftallerotecdj.onrender.com/talleres/api/alumnos/${matricula}/`, alumnoData);
            alert('Datos actualizados correctamente');
        } catch (err) {
            setError('Error al actualizar los datos.');
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={alumnoData.nombre} onChange={handleChange} />
            </div>
            <div>
                <label>Apellido Paterno:</label>
                <input type="text" name="apellido_paterno" value={alumnoData.apellido_paterno} onChange={handleChange} />
            </div>
            <div>
                <label>Apellido Materno:</label>
                <input type="text" name="apellido_materno" value={alumnoData.apellido_materno} onChange={handleChange} />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="telefono" value={alumnoData.telefono} onChange={handleChange} />
            </div>
            <div>
                <label>Género:</label>
                <input type="text" name="genero" value={alumnoData.genero} onChange={handleChange} />
            </div>
            <div>
                <label>Carrera:</label>
                <input type="text" name="carrera" value={alumnoData.carrera} onChange={handleChange} />
            </div>
            <div>
                <label>Semestre:</label>
                <input type="number" name="semestre" value={alumnoData.semestre} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={alumnoData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" name="contraseña" value={alumnoData.contraseña} onChange={handleChange} />
            </div>
            <div>
                <label>Nivel de Acceso:</label>
                <input type="number" name="nivel_acceso" value={alumnoData.nivel_acceso} onChange={handleChange} />
            </div>
            <button type="submit">Actualizar</button>
        </form>
    );
};

export default FormularioAPI;

