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
  size?: "xsmall" | "small" | "medium" | "large";
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
      >
        <option value="" disabled className={styles["placeholder-option"]}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;