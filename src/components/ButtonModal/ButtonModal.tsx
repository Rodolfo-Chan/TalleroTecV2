//import React from "react";
import style from "../ButtonModal/buttonmodal.module.css";

const ButtonModal = ({
    label = "vacio",
    onClick,
  }: {
    label?: string;
    onClick?: () => void;
  }) => {
    return (
      <button
        onClick={() => onClick && onClick()}
        className={`${style["container-button-modal"]}`}
      >
        {label}
      </button>
    );
  };

export default ButtonModal;