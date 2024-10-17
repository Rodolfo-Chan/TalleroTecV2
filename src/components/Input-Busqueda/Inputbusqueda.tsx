import React, { useState } from "react";
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
  // Estado para manejar el foco en el input
  const [isFocused, setIsFocused] = useState(false);

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
        className={`${style["input-properties"]} ${
          style[size + "-input"]
        } ${isFocused ? style["focused-input"] : style["blurred-input"]}`} // Aplica clase según el estado de foco
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)} // Marca el estado como enfocado
        onBlur={() => setIsFocused(false)} // Marca el estado como desenfocado
      />
    </div>
  );
};

export default Inputbusqueda;
