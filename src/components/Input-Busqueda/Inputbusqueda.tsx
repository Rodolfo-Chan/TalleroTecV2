import React from "react";
import style from "../Input-Busqueda/input-busqueda.module.css";

const Inputbusqueda = ({
  label,
  onChange,
  value,
  placeHolder = "",
  size = "medium",
  onEnterPress,
}: {
  label?: string;
  value?: any;
  onChange?: (dat: string) => void;
  placeHolder?: string;
  size?: "xsmall" | "small" | "medium" | "large";
  onEnterPress?: () => void; 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress(); 
    }
  };

  return (
    <div className={`${style["div-container-input"]}`}>
      {label && <h6 className={`${style["h6-label"]}`}>{label}</h6>}
      <input
        placeholder={placeHolder}
        className={`${style["input-properties"]} ${style["placeholder-style"]} ${style[size + "-input"]}`} 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
};

export default Inputbusqueda;
