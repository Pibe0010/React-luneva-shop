import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "./InputDates.css";

export const Inputdate = ({
  value,
  onChange,
  className,
  name,
  id,
  placeholder,
}) => {
  return (
    <Flatpickr
      className={`picker ${className}`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      options={{
        dateFormat: "d/m/Y",
      }}
      placeholder={placeholder}
    />
  );
};
