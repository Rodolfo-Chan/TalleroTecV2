import React from 'react';
import style from "./buttonconstancia.module.css"; 

interface ButtonConstanciaProps {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  tooltip?: string;
}

const ButtonConstancia: React.FC<ButtonConstanciaProps> = ({
  label = "",
  onClick,
  icon,
  tooltip,
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={style["container-buttonupdate"]} // Usa los estilos del módulo CSS
      title={tooltip}
    >
      {icon && <span className={style["button-icon"]}>{icon}</span>}
      {label}
    </button>
  );
};

export default ButtonConstancia;


