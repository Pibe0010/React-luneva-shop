export const PrevBtn = ({ addPrevProducts }) => {
  return (
    <button className="prev-btn" onClick={addPrevProducts}>
      <img
        src="/Icons/arrow_back_ios_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg"
        alt="Anterior"
      />
    </button>
  );
};
