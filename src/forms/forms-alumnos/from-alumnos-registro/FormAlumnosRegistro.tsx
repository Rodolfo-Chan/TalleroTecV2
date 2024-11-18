import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import style from "../from-alumnos-registro/from-alumnos-registro.module.css";
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import InputRadio from '../../../components/Input-Radio/InputRadio';
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import ComponentAlert from "../../../components/Alert/ComponentAlert";

const FormAlumnosRegistro: React.FC = () => {
    const [matricula, setMatricula] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [apellidoPaterno, setApellidoPaterno] = useState<string>('');
    const [apellidoMaterno, setApellidoMaterno] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [carrera, setCarrera] = useState<string>('');
    const [semestre, setSemestre] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [nivelAcceso, setNivelAcceso] = useState<number | string>('');
    const [nivelesAcceso, setNivelesAcceso] = useState<{ nivel: number; nombre: string }[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertMessage, setAlertMessage] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        matricula: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        genero: '',
        carrera: '',
        semestre: '',
        email: '',
        nivelAcceso: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://drftallerotecdj.onrender.com/talleres/api/nivel_acceso/')
            .then((response) => setNivelesAcceso(response.data))
            .catch((error) => console.error("Error al cargar niveles de acceso", error));
    }, []);

    const checkExistingData = async () => {
        try {
            const response = await axios.get('https://drftallerotecdj.onrender.com/talleres/api/alumnos/', {
                params: {
                    matricula_alumno: matricula,
                    telefono,
                    email
                }
            });
            const existingData = response.data;

            const newErrors: { [key: string]: string } = { ...errors };
            let errorFound = false;

            if (existingData.some((item: any) => item.matricula_alumno === matricula)) {
                newErrors.matricula = "Esta matrícula ya existe.";
                errorFound = true;
            }
            if (existingData.some((item: any) => item.telefono === telefono)) {
                newErrors.telefono = "Este N.° teléfonico ya existe.";
                errorFound = true;
            }
            if (existingData.some((item: any) => item.email === email)) {
                newErrors.email = "Este correo electrónico ya existe.";
                errorFound = true;
            }

            setErrors(newErrors);
            return errorFound;
        } catch (error) {
            console.error("Error al verificar datos existentes:", error);
            return false;
        }
    };



    const handleRegistrarClick = async () => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        // Validaciones de cada campo
        if (!matricula) {
            newErrors.matricula = "Ingrese matrícula.";
            isValid = false;
        } else if (!matricula.match(/^\d+$/)) {
            newErrors.matricula = "Ingrese dígitos numéricos.";
            isValid = false;
        } else if (matricula.length !== 8) {
            newErrors.matricula = "Ingrese los 8 dígitos de la matrícula.";
            isValid = false;
        }

        if (!nombre) {
            newErrors.nombre = "Ingrese nombre(s).";
            isValid = false;
        } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
            newErrors.nombre = "No se aceptan dígitos numéricos.";
            isValid = false;
        }

        if (!apellidoPaterno) {
            newErrors.apellidoPaterno = "Ingrese apellido paterno.";
            isValid = false;
        } else if (!apellidoPaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
            newErrors.apellidoPaterno = "No se aceptan dígitos numéricos.";
            isValid = false;
        }

        if (!apellidoMaterno) {
            newErrors.apellidoMaterno = "Ingrese apellido materno.";
            isValid = false;
        } else if (!apellidoMaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
            newErrors.apellidoMaterno = "No se aceptan dígitos numéricos.";
            isValid = false;
        }

        if (!telefono) {
            newErrors.telefono = "Ingrese número telefónico.";
            isValid = false;
        } else if (!telefono.match(/^\d+$/)) {
            newErrors.telefono = "Solo se aceptan dígitos numéricos.";
            isValid = false;
        } else if (telefono.length !== 10) {
            newErrors.telefono = "El teléfono debe contener 10 dígitos.";
            isValid = false;
        }

        if (!genero) {
            newErrors.genero = "Seleccione un género.";
            isValid = false;
        }

        if (!carrera) {
            newErrors.carrera = "Seleccione carrera.";
            isValid = false;
        }

        if (!semestre) {
            newErrors.semestre = "Seleccione semestre.";
            isValid = false;
        }

        if (!email) {
            newErrors.email = "Ingrese el correo electrónico.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Ingrese un correo electrónico válido.";
            isValid = false;
        }

        if (!nivelAcceso) {
            newErrors.nivelAcceso = "Seleccione un nivel de acceso.";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            setAlertSeverity("error");
            setAlertMessage("Por favor complete todos los campos.");
            setShowAlert(true);
            return;
        }

        const exists = await checkExistingData();
        if (exists) {
            setAlertSeverity("warning");
            setAlertMessage("Algunos datos ya están registrados.");
            setShowAlert(true);
            return;
        }

        const nuevoAlumno = {
            matricula_alumno: matricula,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            telefono,
            genero,
            carrera,
            semestre,
            email,
            nivel_acceso: nivelAcceso,
        };

        //NOTA: esto no debe de verse
        axios.post('https://drftallerotecdj.onrender.com/talleres/api/alumnos/', nuevoAlumno)
        //*** */
            .then(() => {
                // Imprimir en consola los datos guardados
                console.log("Datos guardados:", nuevoAlumno);

                setAlertSeverity("success");
                setAlertMessage("Alumno registrado con éxito.");
                setShowAlert(true);

                // Limpiar los campos después del registro
                setMatricula('');
                setNombre('');
                setApellidoPaterno('');
                setApellidoMaterno('');
                setTelefono('');
                setGenero('');
                setCarrera('');
                setSemestre('');
                setEmail('');
                setNivelAcceso('');
                setErrors({
                    matricula: '',
                    nombre: '',
                    apellidoPaterno: '',
                    apellidoMaterno: '',
                    telefono: '',
                    genero: '',
                    carrera: '',
                    semestre: '',
                    email: '',
                    nivelAcceso: ''
                });
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Error al registrar alumno:", error.response.data);
                    setAlertMessage(`Error: ${error.response.data.message || "Error al registrar el alumno."}`);
                } else {
                    console.error("Error:", error.message);
                    setAlertMessage("Error al registrar el alumno.");
                }
                setAlertSeverity("error");
                setShowAlert(true);
            });
    };

/// estoy hasta aki

    return (
        <div className={style["div-container"]}>
            <div className={style["name-module"]}>
                <h1 className={style["name"]}>ALUMNOS</h1>
                <div className={`${style['alert-name']}`}>
                    <ComponentAlert
                        open={showAlert}
                        severity={alertSeverity}
                        message={alertMessage}
                        sx={{ width: '300px', height: '100%', fontSize: '12px' }}
                    />
                </div>
            </div>
            <div>

            <div className={style["header-data"]}>
          <div className={style["register"]}>
            <h1 className={style["list"]}>Ingrese datos del alumno</h1>
          </div>
        </div>
            <div className={style["padre-contenedor"]}>
                <div className={style["datos_seccion1"]}>
                    <div className={style["matricula"]}>
                        <Input label="Matrícula"
                            value={matricula}
                            onChange={(value) => setMatricula(value)}
                            placeHolder="Ingrese la matrícula"
                            size="xsmall" />
                        {errors.matricula && <ComponentAlert open={!!errors.matricula} severity="error" message={errors.matricula} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["nombre"]}>
                        <Input label="Nombre(s)"
                            value={nombre}
                            onChange={(value) => setNombre(value)}
                            placeHolder="Ingrese el nombre"
                            size="small" />
                        {errors.nombre && <ComponentAlert open={!!errors.nombre} severity="error" message={errors.nombre} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["apellido_paterno"]}>
                        <Input label="Apellido Paterno"
                            value={apellidoPaterno}
                            onChange={(value) => setApellidoPaterno(value)}
                            placeHolder="Ingrese el apellido paterno"
                            size="small" />
                        {errors.apellidoPaterno && <ComponentAlert open={!!errors.apellidoPaterno} severity="error" message={errors.apellidoPaterno} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["apellido_materno"]}>
                        <Input label="Apellido Materno"
                            value={apellidoMaterno}
                            onChange={(value) => setApellidoMaterno(value)}
                            placeHolder="Ingrese el apellido materno"
                            size="small" />
                        {errors.apellidoMaterno && <ComponentAlert open={!!errors.apellidoMaterno} severity="error" message={errors.apellidoMaterno} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>
                </div>

                <div className={style["datos_seccion2"]}>
                    <div className={style["genero"]}>
                        <InputRadio
                            label="Género"
                            value={genero}
                            option1="Masculino"
                            option2="Femenino"
                            onChange={setGenero}
                        />
                        {errors.genero && <ComponentAlert open={!!errors.genero} severity="error" message={errors.genero} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["telefono"]}>
                        <Input
                            label="Número Telefónico"
                            value={telefono}
                            onChange={setTelefono}
                            placeHolder="Ingrese el número telefónico"
                            size="small"
                        />
                        {errors.telefono && <ComponentAlert open={!!errors.telefono} severity="error" message={errors.telefono} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["carrera"]}>
                    <Select
                            label="Carrera"
                            value={carrera}
                            onChange={(value) => setCarrera(value as string)}
                            options={[
                                { value: "ING.Informatica", label: "ING.Informatica" },
                                { value: "ING.Gest.Emp", label: "ING.Gest.Emp" },
                                { value: "ING.Agronomia", label: "ING.Agronomia" },
                                { value: "LIC.Biologia", label: "LIC.Biologia" },
                                { value: "LIC.Administración", label: "LIC.Administración" }
                            ]}
                            placeholder="Seleccione una carrera"
                            size="small"
                        />
                        {errors.carrera && <ComponentAlert open={!!errors.carrera} severity="error" message={errors.carrera} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["semestre"]}>
                    <Select
                            label="Semestre"
                            value={semestre}
                            onChange={(value) => setSemestre(Number(value))}
                            options={[1, 2, 3, 4, 5, 6, 7, 8,9].map((sem) => ({ value: sem, label: `${sem} Semestre` }))}
                            placeholder="Seleccione el semestre"
                            size="small"
                        />
                        {errors.semestre && <ComponentAlert open={!!errors.semestre} severity="error" message={errors.semestre} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>
                </div>

                <div className={style["datos_seccion3"]}>
                    <div className={style["email"]}>
                        <Input
                            label="Correo Electrónico"
                            value={email}
                            onChange={setEmail}
                            placeHolder="Ingrese el correo electrónico"
                            size="small"
                        />
                        {errors.email && <ComponentAlert open={!!errors.email} severity="error" message={errors.email} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>

                    <div className={style["nivel-acceso"]}>
                    <Select
                        label="Nivel de Acceso"
                        value={nivelAcceso}
                        onChange={(value) => setNivelAcceso(Number(value))}
                        options={nivelesAcceso.map((nivel) => ({ value: nivel.nivel, label: nivel.nombre }))}
                        placeholder="Seleccione nivel de acceso"
                        size="small"
                    />
                        {errors.nivelAcceso && <ComponentAlert open={!!errors.nivelAcceso} severity="error" message={errors.nivelAcceso} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
                    </div>
                </div>
                <div className={style["button"]}>
                <div className={style["buttons"]}>

                    <ButtonRegistro onClick={handleRegistrarClick} label="Registrar" />
                    <ButtonRegistro onClick={() => navigate("/Alumnos")} label="Atrás" />
                </div>
                </div>
            </div>

            </div>

        </div>
    );
};

export default FormAlumnosRegistro;

