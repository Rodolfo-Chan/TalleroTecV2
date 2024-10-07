//import React from "react";
import style from "../Button/button.module.css";

const Button = ({
    label = "vacio",
    onClick,
  }: {
    label?: string;
    onClick?: () => void;
  }) => {
    return (
      <button
        onClick={() => onClick && onClick()}
        className={`${style["container-button"]}`}
        >
        {label}
      </button>
    );
  };

export default Button;