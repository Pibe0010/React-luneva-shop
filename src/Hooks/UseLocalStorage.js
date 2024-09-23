import { useState, useEffect } from "react";

export const useLocalStorage = (name, outssideInitialValue) => {
  // Obtenemos la info del local storage
  const [value, setValue] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(name)) || outssideInitialValue
    );
  });

  // Guardamos la info en el local storage
  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
};
