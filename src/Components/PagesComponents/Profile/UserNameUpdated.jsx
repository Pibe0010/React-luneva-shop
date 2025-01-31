export const UserNameUpdated = ({
  setActiveModal,
  setUser_name,
  setLast_name,
  handleChange,
}) => {
  return (
    <div className="modal">
      <h2>Editar nombre</h2>
      <form onSubmit={handleChange}>
        <input
          type="text"
          onChange={(e) => setUser_name(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          onChange={(e) => setLast_name(e.target.value)}
          placeholder="Apellido"
        />
        <button>Guardar</button>
        <button onClick={() => setActiveModal(null)}>Cancelar</button>
      </form>
    </div>
  );
};
