import React from "react";
import styles from "../../components/TimeSelector/timeselector.module.css";

interface TimeSelectorProps {
  label?: string;
  hour: string;
  minute: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  size?: "xsmall" | "small" | "medium" | "large";
  customStyles?: React.CSSProperties;
  customClassName?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  size = "medium", // Tamaño por defecto
  customStyles = {},
  customClassName = ""
}) => {
  // Genera opciones de 00 a 23 para el formato de 24 horas
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  // Genera opciones de 00 a 55 en incrementos de 5 minutos
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

  // Función para determinar el color basado en la selección
  const getSelectClassName = (value: string) => {
    return value ? styles["strong-color"] : styles["light-color"];
  };

  return (
    <div className={`${styles["div-container-timepicker"]} ${customClassName}`} style={customStyles}>
      {label && <h6 className={`${styles["h6-label"]}`}>{label}</h6>}
      <div className={styles["timepicker-wrapper"]}>
        <select
          className={`${styles["select-properties"]} ${styles[size + "-select"]} ${getSelectClassName(hour)}`}
          value={hour}
          onChange={(e) => onHourChange(e.target.value)}
        >
          <option value="" disabled className={styles["placeholder-option"]}>
            HH
          </option>
          {hours.map((hourOption, index) => (
            <option key={index} value={hourOption}>
              {hourOption}
            </option>
          ))}
        </select>
        <select
          className={`${styles["select-properties"]} ${styles[size + "-select"]} ${getSelectClassName(minute)}`}
          value={minute}
          onChange={(e) => onMinuteChange(e.target.value)}
        >
          <option value="" disabled className={styles["placeholder-option"]}>
            MM
          </option>
          {minutes.map((minuteOption, index) => (
            <option key={index} value={minuteOption}>
              {minuteOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelector;
