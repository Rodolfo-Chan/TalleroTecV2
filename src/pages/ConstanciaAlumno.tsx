import { useNavigate, useParams } from 'react-router-dom';
import style from './css/constancia-alumno.module.css';
import SubirArchivo from '../components/Documentos/Subirarchivo/SubirArchivo';
import ButtonRegistro from '../components/ButtonRegistro/ButtonRegistro';
import SelectorDocumentoConstanciaAlumno from '../components/SelectorDocumentosConstanciaAlumno/SelectorDocumentoConstanciaAlumno';

const ConstanciaAlumno = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const onUpload = async (formData: FormData): Promise<boolean> => {
    try {
        // Asegúrate de que se esté enviando el `userId` y el archivo
        formData.append('id_alumno', userId || '');

        const response = await fetch('https://drftallerotecdj.onrender.com/talleres/api/constancias_liberacion/', {
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
                <div className={style['contenedor-text']}>
                  <h2>Constancia de cumplimiento</h2>
                </div>
                <p className={style['text']}>Solo se aceptan documentos en formato PDF</p>
                <SubirArchivo onUpload={onUpload} fieldName="contancia_liberacion" />
              </div>
            </div>
          </div>
        </section>
        <div>
          {userId ? (
            <SelectorDocumentoConstanciaAlumno userId={userId} />
          ) : (
            <p>Por favor selecciona un usuario válido.</p>
          )}
        </div>
      </main>
      <br />
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
