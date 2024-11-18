import React from "react";
import style from "../Days-Selector/multipledayselector.module.css";

// Mapeo de IDs a nombres en español (para mostrar los días correctos en la UI)
const daysOfWeek = [
  { id: "monday", label: "Lunes" },
  { id: "tuesday", label: "Martes" },
  { id: "wednesday", label: "Miércoles" },
  { id: "thursday", label: "Jueves" },
  { id: "friday", label: "Viernes" },
];

interface MultipleDaySelectorProps {
  label?: string;
  selectedDays: string;  // Ahora es un string, no un array
  onDayChange: (selectedDays: string) => void;  // Recibimos un string
}

const MultipleDaySelector: React.FC<MultipleDaySelectorProps> = ({
  label,
  selectedDays,
  onDayChange,
}) => {
  // Función para manejar los cambios en los checkboxes
  const handleCheckboxChange = (day: string) => {
    let updatedDays: string;

    // Si el día ya está seleccionado, lo eliminamos del string
    if (selectedDays.includes(day)) {
      updatedDays = selectedDays
        .split(", ")
        .filter((d) => d !== day)
        .join(", ");
    } else {
      // Si no está seleccionado, lo agregamos al string
      updatedDays = selectedDays ? `${selectedDays}, ${day}` : day;
    }

    // Actualizamos el estado con la nueva cadena de días
    onDayChange(updatedDays);
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
              checked={selectedDays.includes(day.label.toLowerCase())}  // Comprobamos si el día está en la cadena
              onChange={() => handleCheckboxChange(day.label.toLowerCase())}  // Pasamos el nombre en minúsculas
              className={style["checkbox-input"]}
            />
            <label
              htmlFor={day.id}
              className={`${style["checkbox-label"]} ${
                selectedDays.includes(day.label.toLowerCase()) 
                  ? style["day-label-bold"] 
                  : style["day-label-pale"]
              }`}
            >
              {day.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleDaySelector;
