//import React from 'react'
import  style from "../ButtonRegistro/buttonregistro.module.css";

const ButtonRegistro = ({
    label = "vacio",
    onClick,
  }: {
    label?: string;
    onClick?: () => void;
  }) => {
    return (
      <button
        onClick={() => onClick && onClick()}
        className={`${style["container-button-registro"]}`}
      >
        {label}
      </button>
    );
  };

export default ButtonRegistro;