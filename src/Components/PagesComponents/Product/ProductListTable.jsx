import { useUser } from "../../../Context/AutContext.jsx";
import { DeleteGenericModal } from "./DeleteGenericModal.jsx";
import { MoreProduct } from "./MoreProduct.jsx";
import { StatusProductController } from "./StatusProductController.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import "./ProductListTable.css";
import { ProductImg } from "./ProductImg.jsx";

export const ProductListTable = ({
  product,
  onUpdateProduct,
  onDelete,
  isActive,
  logo,
}) => {
  const token = useUser();

  // Función para manejar el click en un producto
  const handleProductClick = (product) => {
    if (logo?.ID_product === product.ID_product) {
      logo(null); // Deselecciona el producto
    } else {
      logo(product); // Selecciona el nuevo producto
    }
  };

  return (
    <section className="productTable-container">
      <section id="product_table">
        <div id="productTableHead">
          <div id="productTableHeadRowRef">Ref</div>
          <div id="productTableHeadRowName">Producto</div>
          <div id="productTableHeadRowPrice">Precio</div>
          <div id="productTableHeadRowStock">Stock</div>
          <div id="productTableHeadRowStatus">Estado</div>
          <div id="productTableHeadRowActions">Acciones</div>
        </div>
        <div id="productTableBody">
          {product.length > 0 ? (
            product.map((product) => (
              <div
                key={product.ID_product}
                className="productTableBodyRow"
                onClick={() => handleProductClick(product)}
              >
                <div className="productTableBodyRef">{product.ref_PR}</div>
                <div className="productTableBodyName">{product.name}</div>
                <div className="productTableBodyPrice">{product.price} €</div>
                <div className="productTableBodyStock">{product.Stock} u.</div>
                <div
                  className={`productTableBodyStatus ${product.active ? "active" : "inactive"}`}
                >
                  {product.active ? "Activo" : "Inactivo"}
                </div>
                <div className="productTableBodyActions">
                  <MoreProduct product={product} />
                  <StatusProductController
                    id={product.ID_product}
                    isActive={product.active}
                    activeProduct={isActive}
                    token={token}
                  />
                  <UpdateProduct
                    id={product.ID_product}
                    onUpdateProduct={onUpdateProduct}
                    productData={product}
                    formTypes="product"
                  />
                  <DeleteGenericModal
                    id={product.ID_product}
                    onDelete={onDelete}
                    token={token}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="noResult">No hay productos disponibles</div>
          )}
        </div>
      </section>
      <div className="product-container-img">
        {logo === null ? (
          <img
            className="product-logo"
            src="/img/luneva.png"
            alt="Default product icon"
          />
        ) : (
          product.map((product) =>
            logo.ID_product === product.ID_product ? (
              <div className="product-image-container" key={product.ID_product}>
                <ProductImg
                  id={product.ID_product}
                  images={product}
                  onUpdateProduct={onUpdateProduct}
                />
              </div>
            ) : null
          )
        )}
      </div>
    </section>
  );
};
