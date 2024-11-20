
import style from './css/documentos.module.css';
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
import SelectorDocumentosDescargarRubirca from '../components/SelectorDocumentosDescargarRubricas/SelectorDocumentosDescargarRubrica';
import SelectorDocumentosReportes from '../components/SelectorDocumentosReportes/SelectorDocumentosReportes';

const Documentos = () => {
  const onUpload = async (formData: FormData): Promise<boolean> => {
    try {
      formData.append('id_taller_subgrupo', '56'); // Asigne el id_taller_subgrupo
  
      // Realizar la solicitud a tu API
      const response = await fetch('https://drftallerotecdj.onrender.com/talleres/api/reportes/', {
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
          <h1 className={style['titulo']}>ENTREGA DE DOCUMENTACIÓN</h1>
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
              <p className ={`${style['text']}`}>Importante subir el documento en formato PDF</p>
              <SubirArchivo onUpload={onUpload} fieldName="registro_participantes" />
              </div>
            </div>
          </div>

          <div className={style['card']}>
            <div className={style['card-content']}>
              <div className={style['card-text']}>
                <div className ={`${style['contenedor-text']}`}>
                <h2>Evaluación al desempeño</h2>
                </div>
              <p className ={`${style['text']}`}>Importante subir el documento en formato PDF</p>
              <SubirArchivo onUpload={onUpload} fieldName="evaluacion_desempeno" />
              </div>
            </div>
          </div>
          <div>  <SelectorDocumentosDescargarRubirca /> </div>
          <div>  <SelectorDocumentosReportes /> </div>

        </section>
      </main>


    </div>
  );
};

export default Documentos;
