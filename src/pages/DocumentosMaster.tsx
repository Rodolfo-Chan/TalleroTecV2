
import style from './css/documentos.module.css';
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
import SelectorDocumentosRubricas from '../components/SelectorDocumentosRubricas/SelectorDocumentosRubricas';
const DocumentosMaster = () => {



const onUpload = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await fetch('https://drftallerotecdj.onrender.com/talleres/api/rubrica_reportes/', {
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
                <SubirArchivo onUpload={onUpload} fieldName="registro_de_participantes" />

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
              <SubirArchivo onUpload={onUpload} fieldName="evaluacion_desempeno" />
             
              </div>
            </div>
          </div>
        </section>
        <div>            <SelectorDocumentosRubricas />
        </div>
      </main>
    </div>
  );
};

export default DocumentosMaster;
