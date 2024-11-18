//import React from "react";
import style from "../Input/input.module.css";

const Input = ({
  label,
  onChange,
  value,
  placeHolder = "",
  size = "medium", // Tamaño por defecto
  disabled = false, // Para deshabilitar el input

}: {
  label?: string;
  value?: any;
  onChange?: (dat: string) => void;
  placeHolder?: string;
  size?: "xxsmall" | "xsmall" | "small" | "smedium" | "xmedium" | "medium" | "large";
  disabled?: boolean; 

}) => {
  return (
    <div className={`${style["div-container-input"]}`}>
      {label && <h6 className={`${style["h6-label"]}`}>{label}</h6>}
      <input
        placeholder={placeHolder}
        className={`${style["input-properties"]} ${style["placeholder-style"]} ${style[size + "-input"]}`}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;

