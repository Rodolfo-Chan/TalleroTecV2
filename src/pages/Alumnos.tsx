import React, { useState } from 'react';

const AlumnoForm: React.FC = () => {
    const [formData, setFormData] = useState({
        matricula_alumno: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        genero: '',
        carrera: '',
        semestre: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/talleres/api/alumnos/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Alumno creado:', result);
                // Aquí puedes manejar lo que suceda después de crear el alumno
            } else {
                console.error('Error al crear el alumno:', response.status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Alumno</h2>
            <div>
                <label>Matrícula:</label>
                <input
                    type="text"
                    name="matricula_alumno"
                    value={formData.matricula_alumno}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Apellido Paterno:</label>
                <input
                    type="text"
                    name="apellido_paterno"
                    value={formData.apellido_paterno}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Apellido Materno:</label>
                <input
                    type="text"
                    name="apellido_materno"
                    value={formData.apellido_materno}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Género:</label>
                <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div>
                <label>Carrera:</label>
                <input
                    type="text"
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Semestre:</label>
                <input
                    type="number"
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <button type="submit">Registrar Alumno</button>
        </form>
    );
};

export default AlumnoForm;

