import React from "react";
import style from "../Days-Selector/multipledayselector.module.css";

const daysOfWeek = [
  { id: "monday", label: "Lunes" },
  { id: "tuesday", label: "Martes" },
  { id: "wednesday", label: "Miércoles" },
  { id: "thursday", label: "Jueves" },
  { id: "friday", label: "Viernes" },
];

interface MultipleDaySelectorProps {
  label?: string; 
  selectedDays: string[];
  onDayChange: (selectedDays: string[]) => void;
}

const MultipleDaySelector: React.FC<MultipleDaySelectorProps> = ({
  label,
  selectedDays,
  onDayChange,
}) => {
  const handleCheckboxChange = (day: string) => {
    if (selectedDays.includes(day)) {
      onDayChange(selectedDays.filter((d) => d !== day));
    } else {
      onDayChange([...selectedDays, day]);
    }
  };

  return (
    <div className={style["wrapper-container"]}>
      {/* Contenedor para el título fuera del cuadro de opciones */}
      {label && <h6 className={style["title-label"]}>{label}</h6>}
      
      {/* Contenedor para los días de la semana */}
      <div className={style["div-container-dayselector"]}>
        {daysOfWeek.map((day) => (
          <div key={day.id} className={style["checkbox-container"]}>
            <input
              type="checkbox"
              id={day.id}
              value={day.id}
              checked={selectedDays.includes(day.id)}
              onChange={() => handleCheckboxChange(day.id)}
              className={style["checkbox-input"]}
            />
            <label htmlFor={day.id} className={style["checkbox-label"]}>
              {day.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleDaySelector;
