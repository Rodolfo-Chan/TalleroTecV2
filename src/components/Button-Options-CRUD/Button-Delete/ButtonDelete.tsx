import React from 'react';
import style from "../Button-Delete/buttondelete.module.css";

interface ButtonDeleterops {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  tooltip?: string;
}

const ButtonDelete: React.FC<ButtonDeleterops> = ({
  label = "",
  onClick,
  icon,
  tooltip,
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={style["container-buttondelete"]} // Usa los estilos del módulo CSS
      title={tooltip}
    >
      {icon && <span className={style["button-icon"]}>{icon}</span>}
      {label}
    </button>
  );
};

export default ButtonDelete;

