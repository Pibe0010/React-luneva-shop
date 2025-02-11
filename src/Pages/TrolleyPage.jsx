import { CardPage } from "../Components/PagesComponents/TrolleyPage/CardPage.jsx";
import { TrolleyBackBtn } from "../Components/PagesComponents/TrolleyPage/TrolleyBackBtn.jsx";
import { TrolleyPageBtn } from "../Components/PagesComponents/TrolleyPage/TrolleyPageBtn.jsx";
import { useUser } from "../Context/AutContext.jsx";
import { useCart } from "../Context/CartContext.jsx";

import { MainLayout } from "../Layout/MainLayout.jsx";
import "../Styles/Pages/TrolleyPage.css";

export const TrolleyPage = () => {
  const token = useUser();
  const { cart } = useCart();

  const totalPrice = cart.reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );

  return (
    <MainLayout>
      <h1 className="cartPage-title">Carrito de Compras</h1>
      <section className="cartPage-container">
        <ol className="cartPage-list">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CardPage
                key={product.ID_product}
                product={product}
                token={token}
              />
            ))
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </ol>
        <div className="cartPage-total">
          <p>Precio total: {totalPrice}.00 €</p>
        </div>
        <div className="cartPage-actions">
          <TrolleyPageBtn url="/payments/address" name="Pagar" />
          <TrolleyBackBtn url="/products" />
        </div>
      </section>
    </MainLayout>
  );
};
