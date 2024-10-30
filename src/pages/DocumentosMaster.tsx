
import style from './css/documentos.module.css';
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
// import DescargarArchivo from '../components/Documentos/Descargararchivo/DescargarArchivo';

const DocumentosMaster = () => {

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
          <h1 className={style['titulo']}>RUBRICAS DE CALIFICACIÓN PARA PROFESORES</h1>
        </div>
      </header>

      <main className={style['main-content']}>
        <section className={style['cards']}>
          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <div className ={`${style['contenedor-text']}`}>
                <h2>Registro de participantes</h2>
                </div>
                <p className ={`${style['text']}`}>Subir el archivo en documento WORD</p>
                <SubirArchivo onUpload={onUpload} />
                {/* <p className ={`${style['text']}`}>Descarga la rúbrica</p> */}
                {/* <DescargarArchivo 
        fileName="informe.docx" 
        downloadUrl="/download-informe" 
        downloadText="Descargar Informe" // Otro texto para otro uso
      />               */}
      </div>
            </div>
          </div>

          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <div className ={`${style['contenedor-text']}`}>
                <h2>Evaluación al desempeño</h2>
                </div>
              <p className ={`${style['text']}`}>Subir el archivo en documento WORD</p>
                <SubirArchivo onUpload={onUpload} />
                {/* <p className ={`${style['text']}`}>Descarga la rúbrica</p> */}
                {/* <DescargarArchivo fileName="Evaluacion_al_deesmpeño.pdf" downloadUrl="/ruta/al/archivo/participantes.pdf" showFileName={true}  showDownloadText={false}/> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocumentosMaster;
