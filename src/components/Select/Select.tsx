import React from "react";
import styles from "../Select/select.module.css"; 

const Select = ({
  label,
  value,
  onChange,
  options,
  size = "medium", // Tamaño por defecto
  placeholder = "Selecciona una opción",
  customStyles = {},
  customClassName = ""
}: {
  label?: string;
  value?: any;
  onChange?: (dat: string) => void;
  options: string[];
  size?: "xxxsmall" | "xxsmall" | "xsmall" | "small" | "medium" | "large";
  placeholder?: string;
  customStyles?: React.CSSProperties;
  customClassName?: string;
}) => {
  return (
    <div className={`${styles["div-container-select"]} ${customClassName}`} style={customStyles}>
      {label && <h6 className={`${styles["h6-label"]}`}>{label}</h6>}
      <select
        className={`${styles["select-properties"]} ${styles[size + "-select"]}`}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        /* Agregar esta clase para cambiar el color del placeholder */
        style={value === "" ? { color: "#999999" } : { color: "#000000" }} // Cambiar color cuando no se selecciona nada
      >
        <option value="" disabled className={styles["placeholder-option"]}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className={styles["option-item"]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
