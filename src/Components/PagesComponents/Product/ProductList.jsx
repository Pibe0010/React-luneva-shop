import { useEffect, useState } from "react";
import "./ProductList.css";

export const ProductList = ({ product }) => {
  const traducirEstado = (estado) => {
    return estado ? "Activo" : "Inactivo";
  };

  // Estado para controlar si el usuario está activo o no
  const [isActive, setIsActive] = useState(product.active);

  useEffect(() => {
    setIsActive(product.active);
  }, [product.active]);

  const activeClass = isActive ? "active" : "inactive";

  return (
    <>
      <div id="element_customer_subtitle" className="mainProductInsideSub">
        <p className="refTitle">Ref: {product.ref_PR}</p>
      </div>
      <p className="mainProductInsideSub">
        <strong>Nombre: </strong> {product.name}
      </p>
      <p className="mainProductInsideSub">
        <strong>Precio: </strong> {product.price} €
      </p>
      <p className="mainProductInsideSub">
        <strong>Stock: </strong> {product.Stock} u.
      </p>
      <p className="mainProductInsideSub">
        <strong>Estado: </strong>
        <span className={activeClass}> {traducirEstado(isActive)}</span>
      </p>
    </>
  );
};
