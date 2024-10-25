import { useState, useEffect } from 'react';
import style from './ImageCarrusel.module.css'; // Importa el archivo CSS como un módulo

// Importa las imágenes locales
import Image1 from './Imagenes/Image1.jpg';
import imagen2 from './Imagenes/Image2.jpg';
import imagen3 from './Imagenes/Image3.jpg';
import imagen4 from './Imagenes/Image4.jpg';
import imagen5 from './Imagenes/Image5.jpeg';
import imagen6 from './Imagenes/Image6.jpg';
import imagen7 from './Imagenes/Image7.jpg';
import imagen8 from './Imagenes/Image8.jpg';
import imagen9 from './Imagenes/Image9.jpg';
import imagen10 from './Imagenes/Image10.jpg';
import imagen11 from './Imagenes/Image11.jpeg';
import imagen12 from './Imagenes/Image12.jpg';
import imagen13 from './Imagenes/Image13.jpeg';
import imagen14 from './Imagenes/Image14.jpeg';
import imagen15 from './Imagenes/Image15.jpeg';
import imagen16 from './Imagenes/Image16.jpeg';
import imagen17 from './Imagenes/Image17.jpeg';
import imagen18 from './Imagenes/Image18.jpeg';
import imagen19 from './Imagenes/Image19.jpeg';
import imagen20 from './Imagenes/Image20.jpeg';
import imagen21 from './Imagenes/Image21.jpeg';
import imagen22 from './Imagenes/Image22.jpeg';
import imagen23 from './Imagenes/Image23.jpeg';
import imagen24 from './Imagenes/Image24.jpeg';
import imagen25 from './Imagenes/Image25.jpeg';
import imagen26 from './Imagenes/Image26.jpeg';






const images = [Image1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10, , imagen11, imagen12, imagen13, imagen14, imagen15, imagen16, imagen17, imagen18, imagen19, imagen20, imagen21, imagen22, imagen23, imagen24, imagen25, imagen26];

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${style['carousel']}`}> {/* Aplica la clase del carrusel */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`${style['carousel-item']} ${index === currentIndex ? style['active'] : ''}`}
        >
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
      <div className={`${style['indicators']}`}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${style['indicator']} ${index === currentIndex ? style['active'] : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;

