export const PhoneUserUpdated = ({
  setActiveModal,
  setPhone,
  handleChange,
}) => {
  return (
    <div className="modal">
      <h2>Editar teléfono</h2>
      <form onSubmit={handleChange}>
        <input
          type="tel"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
        />
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
