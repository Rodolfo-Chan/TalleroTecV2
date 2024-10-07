import React from "react";
import style from "../Input-Radio/input-radio.module.css";
const InputRadio = ({
  label,
  onChange,
  value,
  option1,
  option2,
}: {
  label?: string;
  value?: string;
  option1: string;
  option2: string;
  onChange?: (dat: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className ={`${style['div-container-input']}`}>
      {label && <h6 className ={`${style['h6-label']}`}>{label}</h6>}
      <label className ={`${style['name-value']}`}>
        <input
          type="radio"
          value={option1}
          checked={value === option1}
          onChange={handleChange}
        />
        {option1}
      </label>

      <label className ={`${style['name-value']}`}>
        <input
          type="radio"
          value={option2}
          checked={value === option2}
          onChange={handleChange}
        />
        {option2}
      </label>
    </div>
  );
};

export default InputRadio;