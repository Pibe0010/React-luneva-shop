import { CheckboxProduct } from "./CheckboxProduct.jsx";

export const CreateProductForm = ({
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
  active,
  setActive,
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
            className="createProduct-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
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
            className="createProduct-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
            className="createProduct-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
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
            className="createProduct-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <label htmlFor="category">
          <input
            placeholder="Categoria"
            id="category"
            name="stock"
            type="text"
            className="createProduct-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-container">
        <CheckboxProduct active={active} setActive={setActive} />
      </div>
    </>
  );
};
