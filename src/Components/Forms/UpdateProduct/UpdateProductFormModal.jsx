export const UpdateProductFormModal = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  stock,
  setStock,
  category,
  setCategory,
}) => {
  return (
    <>
      <div className="input-container">
        <label htmlFor="name">
          <input
            placeholder="Nombre"
            id="name"
            name="name"
            type="text"
            className="updateProduct-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="description">
          <input
            placeholder="Descripcion"
            id="description"
            name="description"
            type="text"
            className="updateProduct-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="price">
          <input
            placeholder="Precio"
            id="price"
            name="price"
            type="number"
            className="updateProduct-input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="stock">
          <input
            placeholder="Stock"
            id="stock"
            name="stock"
            type="number"
            className="updateProduct-input"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="category">
          <input
            placeholder="Categoria"
            id="category"
            name="category"
            type="text"
            className="updateProduct-input"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
      </div>
    </>
  );
};
