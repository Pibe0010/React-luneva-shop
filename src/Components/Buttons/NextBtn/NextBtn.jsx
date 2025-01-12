export const NextBtn = ({ addNextProducts }) => {
  return (
    <button className="next-btn" onClick={addNextProducts}>
      <img
        src="/Icons/arrow_forward_ios_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg"
        alt="Siguiente"
      />
    </button>
  );
};
