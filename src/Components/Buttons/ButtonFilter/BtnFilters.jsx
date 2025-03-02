import { useEffect, useState } from "react";
import "./BtnFilter.css";
import { BtnFilterAction } from "./BtnFilterActions.jsx";

export const BtnFilters = ({ options, onSort, defaultSort }) => {
  const [selectedOption, setSelectedOption] = useState(defaultSort);

  const handleOptionSelect = (option) => {
    if (selectedOption && selectedOption.value === option.value) {
      // Si se hace clic en la opción seleccionada, la deselecciona
      setSelectedOption(defaultSort);
      onSort(defaultSort); // Llama a la función de ordenamiento con null para deseleccionar
    } else {
      setSelectedOption(option);
      onSort(option); // Llama a la función de ordenamiento
    }
  };

  // Ordenamiento por defecto SOLO al montar el componente
  useEffect(() => {
    if (defaultSort) {
      onSort(defaultSort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="btn-filters-container">
      <div className="btn-filters">
        {options.map((option) => (
          <BtnFilterAction
            key={option.value}
            className={` ${
              selectedOption && selectedOption.value === option.value
                ? "selected"
                : ""
            }`}
            onClick={() => handleOptionSelect(option)}
            name={option.name}
          ></BtnFilterAction>
        ))}
      </div>
    </div>
  );
};
