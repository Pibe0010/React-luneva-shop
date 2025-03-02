import { useEffect, useState } from "react";
import { CheckoutLoader } from "../../Animations/CheckoutLoader.jsx";

export const CheckoutCard = ({
  handlerSubmit,
  product,
  setTotalAmount,
  loading,
  setDiscountCupon,
  setDiscountOffer,
  setShippingCost,
  setTaxIva,
}) => {
  const [cupon, setCupon] = useState("");
  const discount =
    product?.product_discount != null
      ? `${product.product_discount}€`
      : "0.00€";

  // Total del carrito
  const subtotal = product.reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );
  // Descuento del producto
  const totalDiscount = product.reduce(
    (acc, product) =>
      acc + parseFloat(product.price) * product.product_discount,
    0
  );
  const addDiscountPrice = `${totalDiscount.toFixed(2)}€`;

  // Descuento del cupon
  const discountCupon = cupon === "LUNEVA" ? 1.0 : 0.0;
  const addDiscountCupon = `${discountCupon.toFixed(2)}€`;

  // Envio fees
  const shipping = product.reduce(
    (acc, product) => acc + parseFloat(product.shipment_cost),
    0
  );
  const addShipping = `${shipping.toFixed(2)}€`;

  // Iva fees
  const iva = subtotal * 0.21;
  const addIva = `${iva.toFixed(2)}€`;

  // Total
  const total = subtotal - totalDiscount - discountCupon + shipping + iva;
  const addTotal = `${total.toFixed(2)}`;

  useEffect(() => {
    setTotalAmount(addTotal);
    setDiscountCupon(discountCupon);
    setDiscountOffer(totalDiscount);
    setShippingCost(shipping);
    setTaxIva(iva);
  }, [
    addTotal,
    shipping,
    discountCupon,
    totalDiscount,
    iva,
    setTotalAmount,
    setDiscountCupon,
    setDiscountOffer,
    setShippingCost,
    setTaxIva,
  ]);

  return (
    <section className="checkout-container">
      <form className="master-container" onSubmit={handlerSubmit}>
        <div className="checkout-card checkout-cart">
          <label className="title">Productos</label>
          <div className="checkout-products">
            <div className="checkout-product">
              <ol>
                {product.map((products) => (
                  <li
                    key={products.ID_payment}
                    className="checkout-product-card"
                  >
                    <h2 className="checkout-title">Jabón {products.name}</h2>
                    <p>Precio: {products.price}€</p>
                    <p>Cantidad: {products.product_amount}uds</p>
                    <p>Descuento: {discount} </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="checkout-card coupons">
          <label className="title">Cúpon de descuento</label>
          <div className="checkout-form">
            <input
              type="text"
              placeholder="Aplica tu cúpon"
              onChange={(e) => setCupon(e.target.value)}
              className="input_field"
            />
            <button>Aplicar</button>
          </div>
        </div>

        <div className="checkout-card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Subtotal carrito:</span>
            <span>{subtotal}.00€</span>
            <span>Descuento por cúpon:</span>
            <span>{addDiscountCupon}</span>
            <span>Descuento por oferta:</span>
            <span>{addDiscountPrice}</span>
            <span>Envio fees:</span>
            <span>{addShipping}</span>
            <span>IVA fees:</span>
            <span>{addIva}</span>
          </div>
          <div className="checkout--footer">
            <label className="chackout-price">
              <sup>€</sup>
              {addTotal}
            </label>

            {loading ? (
              <CheckoutLoader />
            ) : (
              <button className="checkout-btn">Pagar</button>
            )}
          </div>
        </div>
        <p className="form-insert-address-page">3/3</p>
      </form>
    </section>
  );
};
