import { useState, useEffect } from "react";
import style from "../from-profesores-actulizar/from-profesores-actualizar.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input-Radio/InputRadio";
import Select from "../../../components/Select/Select";
import { useNavigate, useParams } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import axios from "axios";

const FromProfesoresActualizar = () => {
  const { userId } = useParams();

    const [nombre, setNombre] = useState<string>('');
    const [apellidopaterno, setApellidoPaterno] = useState<string>('');
    const [apellidomaterno, setApellidoMaterno] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [estatus, setEstatus] = useState<string>('');
    const [nivelAcceso, setNivelAcceso] = useState<number | string>('');
    const [nivelesAcceso, setNivelesAcceso] = useState<{ nivel: number; nombre: string }[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertMessage, setAlertMessage] = useState("");
  

    const [errors, setErrors] = useState<{ [key: string]: string }>({
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
        .then(response => setNivelesAcceso(response.data))
        .catch(error => console.error("Error al cargar niveles de acceso", error));

    if (userId) {
        axios.get(`https://drftallerotecdj.onrender.com/talleres/api/instructores/${userId}/`)
            .then(response => {
                const profesorData = response.data;
                setNombre(profesorData.nombre);
                setApellidoPaterno(profesorData.apellido_paterno);
                setApellidoMaterno(profesorData.apellido_materno);
                setTelefono(profesorData.telefono);
                setGenero(profesorData.genero);
                setTipo(profesorData.tipo);
                setEstatus(profesorData.estatus);
                setEmail(profesorData.email);
                setNivelAcceso(profesorData.nivel_acceso);
            })
            .catch(error => console.error("Error al cargar los datos del profesor:", error));
    }
}, [userId]);



const handleEditClick = async () => {
  const newErrors: { [key: string]: string } = {};
  let isValid = true;


  if (!nombre) {
      newErrors.nombre = "Ingrese nombre(s).";
      isValid = false;
  } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      newErrors.nombre = "No se aceptan dígitos numéricos.";
      isValid = false;
  }

  // Continuar con las demás validaciones

  setErrors(newErrors);

  if (!isValid) {
      setAlertSeverity("warning");
      setAlertMessage("Por favor corrija los errores.");
      setShowAlert(true);
      return;
  }
  
    if (!apellidopaterno) {
      newErrors.apellidoPaterno = "Ingrese apellido paterno.";
      isValid = false;
  } else if (!apellidopaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      newErrors.apellidoPaterno = "No se aceptan dígitos numéricos.";
      isValid = false;
  }

  if (!apellidomaterno) {
      newErrors.apellidoMaterno = "Ingrese apellido materno.";
      isValid = false;
  } else if (!apellidomaterno.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
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

  if (!tipo) {
      newErrors.tipo = "Seleccione un tipo.";
      isValid = false;
  }

  if (!estatus) {
      newErrors.estatus = "Seleccione el estatus.";
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

  const updatedProfesor = {
      nombre,
      apellido_paterno: apellidopaterno,
      apellido_materno: apellidomaterno,
      telefono,
      genero,
      tipo,
      estatus,
      email,
      nivel_acceso: nivelAcceso,
  };

  try {
      const response = await axios.put(`https://drftallerotecdj.onrender.com/talleres/api/instructores/${userId}/`, updatedProfesor);
      if (response.status === 200) {
          setShowAlert(true);
          setAlertSeverity("success");
          setAlertMessage("Datos actualizados correctamente.");
      }
  } catch (error) {
      console.error("Error al actualizar los datos del alumno:", error);
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Se encontraron datos repetidos");
  }
};



  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>PROFESORES</h1>
        <div className={style['alert-name']}>
          <ComponentAlert
            open={showAlert}
            severity={alertSeverity}
            message={alertMessage}
          />
        </div>
      </div>

      <div>
        <div className={style["header-data"]}>
          <div className={style["register"]}>
            <h1 className={style["list"]}>Actualizar datos del profesor</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
            <div className={style['nombre']}>
            <Input label="Nombre(s)"
                            value={nombre}
                            onChange={(value) => setNombre(value)}
                            placeHolder="Ingrese el nombre"
                            size="small" />
                        {errors.nombre && <ComponentAlert open={!!errors.nombre} severity="error" message={errors.nombre} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            </div>
            <div className ={`${style['apellido_paterno']}`}>
            <Input label="Apellido Paterno"
                            value={apellidopaterno}
                            onChange={(value) => setApellidoPaterno(value)}
                            placeHolder="Ingrese el apellido paterno"
                            size="small" />
                        {errors.apellidoPaterno && <ComponentAlert open={!!errors.apellidoPaterno} severity="error" message={errors.apellidoPaterno} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            </div>

            <div className ={`${style['apellido_materno']}`}>
            <Input label="Apellido Materno"
                            value={apellidomaterno}
                            onChange={(value) => setApellidoMaterno(value)}
                            placeHolder="Ingrese el apellido materno"
                            size="small" />
                        {errors.apellidoMaterno && <ComponentAlert open={!!errors.apellidoMaterno} severity="error" message={errors.apellidoMaterno} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
            </div>

            <div className ={`${style['genero']}`}>
            <div className={style["radio-container"]}>
            <InputRadio
                            label="Género"
                            value={genero}
                            option1="Masculino"
                            option2="Femenino"
                            onChange={setGenero}
                        />
                        {errors.genero && <ComponentAlert open={!!errors.genero} severity="error" message={errors.genero} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>
              </div>

          </div>
        
          <div className={style["datos_seccion2"]}>
           
            <div className={style['correo']}>
            <Input
                         label="Correo Electrónico"
                         value={email}
                         onChange={setEmail}
                         placeHolder="Ingrese el correo electrónico"
                         size="large"
                     />
                     {errors.email && <ComponentAlert open={!!errors.email} severity="error" message={errors.email} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>

              <div className={style['telefono']}>
              <Input
                         label="Número Telefónico"
                         value={telefono}
                         onChange={setTelefono}
                         placeHolder="Ingrese el número telefónico"
                         size="small"
                     />
                     {errors.telefono && <ComponentAlert open={!!errors.telefono} severity="error" message={errors.telefono} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>

              <div className={`${style['tipo-profesor']}`}>
              <Select
                         label="Tipo profesor"
                         value={tipo}
                         onChange={(value) => setTipo(value as string)}
                         options={[
                             { value: "Alumno", label: "Alumno" },
                             { value: "Profesor", label: "Profesor" },
                         ]}
                         placeholder="Seleccione un tipo"
                         size="xsmall"
             />
               {errors.tipo && <ComponentAlert open={!!errors.tipo} severity="error" message={errors.tipo} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>

              <div className={`${style['estatus-profesor']}`}>
              <Select
                         label="Estatus"
                         value={estatus}
                         onChange={(value) => setEstatus(value as string)}
                         options={[
                             { value: "Activo", label: "Activo" },
                             { value: "Inactivo", label: "Inactivo" },
                         ]}
                         placeholder="Seleccione el estatus"
                         size="xsmall"
             />
               {errors.estatus && <ComponentAlert open={!!errors.estatus} severity="error" message={errors.estatus} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
              </div>
          </div>

          <div className={style["datos_seccion3"]}>
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
            <ButtonRegistro
                onClick={handleEditClick} label="Actualizar"/>
              <ButtonRegistro
                onClick={() => {
                  navigate("/Profesores");
                  console.log("presionado");
                }}
                label="Atrás"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromProfesoresActualizar;
