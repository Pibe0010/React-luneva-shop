import "./BtnFilterAction.css";

export const BtnFilterAction = ({ onClick, name }) => {
  return (
    <button className="btn-action-filter" onClick={onClick}>
      {name}
    </button>
  );
};
