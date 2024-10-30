
import style from './css/constancia-alumno.module.css';
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
import DescargarArchivo from '../components/Documentos/Descargararchivo/DescargarArchivo';
import ButtonRegistro from '../components/ButtonRegistro/ButtonRegistro';
import { useNavigate } from "react-router-dom";

const ConstanciaAlumno = () => {
  const navigate = useNavigate();

  // Solo para simular la subida exitosa del archivo
  // const onUpload = async (): Promise<boolean> => {
  //   try {
  //     // Simulación de subida de archivo
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
      
  //     // Simulamos éxito en la subida
  //     return true;
  //   } catch (error) {
  //     console.error('Error al subir el archivo:', error);
  //     return false; // En caso de error
  //   }
  // };
  

 //Usando formData
 const onUpload = async (formData: FormData): Promise<boolean> => {
   try {
     // Realizar la solicitud a tu API
     const response = await fetch('/api/upload', {
       method: 'POST',
       body: formData,
     });

     if (!response.ok) {
       throw new Error('Error en la carga del archivo');
     }
      
     return true;
   } catch (error) {
     console.error('Error al subir el archivo:', error);
     return false;
   }
 };

  return (
    <div className={style['home-container']}>
      <header className={style['header']}>
        <div className={style['header-content']}>
          <h1 className={style['titulo']}>ENTREGA DE CONSTANCIA</h1>
        </div>
      </header>

      <main className={style['main-content']}>
        <section className={style['cards']}>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <div className ={`${style['contenedor-text']}`}>
                <h2>Constancia de cumplimiento</h2>
                </div>
              <p className ={`${style['text']}`}>Solo se aceptan documentos en formato PDF</p>
                <SubirArchivo onUpload={onUpload} />
                <p className ={`${style['text']}`}>Descargar la constancia</p>
                <DescargarArchivo fileName="constancia_de_cumplimiento.pdf" downloadUrl="/ruta/al/archivo/participantes.pdf"   showFileName={true}  showDownloadText={false}  />
              </div>
            </div>
          </div>

 
        </section>
      </main>
      <header className={style['header']}>
        <div className={style['header-content']}>
        <ButtonRegistro
                onClick={() => {
                  navigate("/AlumnosLiberados");
                  console.log("presionado");
                }}
                label="Atrás"
              />
        </div>
      </header>

    </div>
  );
};

export default ConstanciaAlumno;
