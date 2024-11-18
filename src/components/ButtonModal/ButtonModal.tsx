import React, { useState } from "react";
import style from "../ButtonModal/buttonmodal.module.css";

interface ButtonModalProps {
  label?: string;
  onClick?: () => Promise<void> | void;
}

const ButtonModal: React.FC<ButtonModalProps> = ({
  label = "vacio",
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick();
      } catch (error) {
        console.error("Error en la ejecución de la función onClick:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${style["container-button-modal"]} ${isLoading ? style["button-loading"] : ""}`}
      disabled={isLoading}
    >
      {isLoading ? <span className={style["loader"]}></span> : label}
    </button>
  );
};

export default ButtonModal;
