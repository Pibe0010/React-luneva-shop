import "./MoreInfoButton.css";

export const MoreInfoButton = ({ onClick }) => {
  return (
    <button className="MoreInfobtn" onClick={onClick}>
      <img
        className="iconMoreInfo"
        src="/Icons/more.svg"
        alt="Boton de ver mas"
      />
    </button>
  );
};
