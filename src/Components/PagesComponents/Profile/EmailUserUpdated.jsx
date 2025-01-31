export const EmailUserUpdated = ({
  setActiveModal,
  setEmail,
  handleChange,
}) => {
  return (
    <div className="modal">
      <h2>Editar email</h2>
      <form onSubmit={handleChange}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
