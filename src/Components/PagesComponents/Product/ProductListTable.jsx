import { useUser } from "../../../Context/AutContext.jsx";
import { DeleteGenericModal } from "./DeleteGenericModal.jsx";
import { MoreProduct } from "./MoreProduct.jsx";
import { StatusProductController } from "./StatusProductController.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import "./ProductListTable.css";
import { InsertImg } from "./InsertImg.jsx";

export const ProductListTable = ({
  product,
  onUpdateProduct,
  onDelete,
  isActive,
}) => {
  const token = useUser();

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
              <div key={product.ID_product} className="productTableBodyRow">
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
                  <InsertImg
                    id={product.ID_product}
                    product={product}
                    onUpdateProduct={onUpdateProduct}
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
    </section>
  );
};
