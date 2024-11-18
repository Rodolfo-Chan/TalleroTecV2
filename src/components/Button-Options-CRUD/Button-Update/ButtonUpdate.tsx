import React from 'react';
import style from "../Button-Update/buttonupdate.module.css"; 

interface ButtonUpdateProps {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  tooltip?: string;
}

const ButtonUpdate: React.FC<ButtonUpdateProps> = ({
  label = "",
  onClick,
  icon,
  tooltip,
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={style["container-buttonupdate"]} 
      title={tooltip}
    >
      {icon && <span className={style["button-icon"]}>{icon}</span>}
      {label}
    </button>
  );
};

export default ButtonUpdate;