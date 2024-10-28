// SelectGeneric.tsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styles from '../SelectVarios/selectvario.module.css';

interface Option {
  id: number;
  label: string;
  placeholder: string;
}

interface SelectVariosProps {
  options: Option[];
  onOptionSelected: (option: Option | null) => void;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large'; 
  customStyles?: React.CSSProperties; 
  customClassName?: string;
}

const SelectVarios = forwardRef<{
  resetSelect: () => void;
}, SelectVariosProps>(({
  options,
  onOptionSelected,
  label,
  placeholder = 'Selecciona una opción',
  size = 'medium',
  customStyles = {},
  customClassName = ''
}, ref) => {
  const [selectedValue, setSelectedValue] = useState<number | ''>('');

  useImperativeHandle(ref, () => ({
    resetSelect: () => setSelectedValue('')
  }));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value);
    const selectedOption = options.find(option => option.id === id);
    setSelectedValue(id);
    onOptionSelected(selectedOption || null);
  };

  return (
    <div className={`${styles['div-container-select']} ${customClassName}`} style={customStyles}>
      {label && <h6 className={styles['h6-label']}>{label}</h6>}
      <select
        className={`${styles['select-properties']} ${styles[size + '-select']}`}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="" disabled className={styles['placeholder-option']}>
          {placeholder}
        </option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.id}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectVarios;
