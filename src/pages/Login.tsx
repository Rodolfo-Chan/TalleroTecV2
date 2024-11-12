
import React, { useState, useEffect } from 'react';
import style from "../pages/style-login.module.css";
import img from '../assets/img/botarga.svg';
import Modal from '../components/Modals/Modals';
import alerta from '../assets/audio/alert.mp3'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
  email: string;
  contraseña: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [audio] = useState(new Audio(alerta)); 
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (email && password) {
      try {
        const urls = [
          'https://drftallerotecdj.onrender.com/talleres/api/alumnos/',
        ];

        const requests = urls.map(url =>
          fetch(url)
            .then(response => response.json())
            .then((data: User[]) => {
              console.log(data); // Para revisar la respuesta
              return data.find(user => user.email === email && user.contraseña === password);
            })
        );

        const results = await Promise.all(requests);
        const validUser = results.find(user => user !== undefined);

        if (validUser) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
          window.location.href = '/Home';
        } else {
          setModalMessage('Credenciales incorrectas.Por favor, intente de nuevo.');
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error al verificar credenciales:', error);
        setModalMessage('Ocurrió un error. Por favor, intente más tarde.');
        setShowModal(true);
      }
    } else {
      setModalMessage('Por favor, ingrese un correo y contraseña válidos');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      audio.play();
    }
  }, [showModal, audio]);

  return (
    <div className={style['contenedor']}>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>
      <div className={style['cube']}></div>

      <div className={style['imagen']}>
        <div className={style['triangulo-equilatero-bottom-left']}></div>
        <div className={style['triangulo-derecho']}></div>
        <img src={img} alt="Descripción de la imagen" className={style['imagen img']} />
      </div>
      
      <div className={style['cuadro-login']}>
        <div>
          <img src="https://comitan.tecnm.mx/menu_inf/2022-1/arteycultura//participantes/29_Tizimin.png" alt="" className={style['logo-tec']} />
        </div>
        <h1 className={style['title']}>Bienvenido de Vuelta</h1>
        <form className={style['formulario']} onSubmit={handleLogin}>
          <div className={style['campo']}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Ingresa Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className={style['campo']}>
            <label htmlFor="password">Password</label>
            <div className={style['password-container']}>
              <input
                type={showPassword ? 'text' : 'password'} 
                id="password"
                name="password"
                placeholder="Ingrese su password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)} className={style['password-toggle']}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button className={style['button-login']} type="submit">Iniciar Sesión</button>
        </form>
      </div>

      <Modal show={showModal} onClose={handleCloseModal}>
        <img src="https://cdn.icon-icons.com/icons2/317/PNG/512/shield-error-icon_34372.png" alt="" />
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default Login;
