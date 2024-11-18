import { useEffect, useState } from "react";
import style from "../from-profesores-registro/from-profesores.module.css";
import ButtonRegistro from "../../../components/ButtonRegistro/ButtonRegistro";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input-Radio/InputRadio";
import Select from "../../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import ComponentAlert from "../../../components/Alert/ComponentAlert";
import axios from "axios";

const FromProfesoresRegistro = () => {
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
/////****estoy aqui***** */

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    genero: '',
    tipo: '',
    estatus: '',
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
      const response = await axios.get('https://drftallerotecdj.onrender.com/talleres/api/instructores/', {
          params: {
              // matricula_alumno: matricula,
              telefono,
              email
          }
      });
      const existingData = response.data;

      const newErrors: { [key: string]: string } = { ...errors };
      let errorFound = false;

      // if (existingData.some((item: any) => item.matricula_alumno === matricula)) {
      //     newErrors.matricula = "Esta matrícula ya existe.";
      //     errorFound = true;
      // }
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

////


const handleRegistrarClick = async () => {
  const newErrors: { [key: string]: string } = {};
  let isValid = true;

  // Validaciones de cada campo
 
  if (!nombre) {
      newErrors.nombre = "Ingrese nombre(s).";
      isValid = false;
  } else if (!nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      newErrors.nombre = "No se aceptan dígitos numéricos.";
      isValid = false;
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

  const nuevoProfesor = {
      
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

  //NOTA: esto no debe de verse
  axios.post('https://drftallerotecdj.onrender.com/talleres/api/instructores/', nuevoProfesor)
  //*** */
      .then(() => {
          // Imprimir en consola los datos guardados
          console.log("Datos guardados:", nuevoProfesor);

          setAlertSeverity("success");
          setAlertMessage("Profesor registrado con éxito.");
          setShowAlert(true);

          // Limpiar los campos después del registro
          setNombre('');
          setApellidoPaterno('');
          setApellidoMaterno('');
          setTelefono('');
          setGenero('');
          setTipo('');
          setEstatus('');
          setEmail('');
          setNivelAcceso('');
          setErrors({
              nombre: '',
              apellidoPaterno: '',
              apellidoMaterno: '',
              telefono: '',
              genero: '',
              carrera: '',
              semestre: '',
              email: '',
              tipo: '',
              estatus: '',
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


//////



  return (
    <div className={style["div-container"]}>
      <div className={style["name-module"]}>
        <h1 className={style["name"]}>PROFESORES</h1>
        <div className ={`${style['alert-name']}`}>
        <ComponentAlert
          open={showAlert}
          severity={alertSeverity}
          message={alertMessage}
          sx={{ width: '300px', height: '100%', fontSize: '12px' }}

        />
        </div>
      </div>

   
        <div className={style["header-data"]}>
          <div className={style["register"]}>
            <h1 className={style["list"]}>Ingrese datos del profesor</h1>
          </div>
        </div>

        <div className={style["padre-contenedor"]}>
          <div className={style["datos_seccion1"]}>
                  <div className ={`${style['nombre']}`}>
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
                  </div>

       
                  <div className={style["datos_seccion2"]}>
           
          
           <div className ={`${style['correo']}`}>
           <Input
                         label="Correo Electrónico"
                         value={email}
                         onChange={setEmail}
                         placeHolder="Ingrese el correo electrónico"
                         size="large"
                     />
                     {errors.email && <ComponentAlert open={!!errors.email} severity="error" message={errors.email} sx={{ width: 'auto', height: 'auto', fontSize: '12px' }} />}
           </div>
     


           <div className ={`${style['telefono']}`}>
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
             onClick={handleRegistrarClick} label="Registrar"/>
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

  );
};
export default FromProfesoresRegistro;
