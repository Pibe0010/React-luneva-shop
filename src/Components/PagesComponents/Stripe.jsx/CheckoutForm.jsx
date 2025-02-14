import "./StripePayments.css";
import { CheckoutCard } from "./checkoutCard.jsx";
import { useUser } from "../../../Context/AutContext.jsx";
import { useState } from "react";
import { usePaymentListUser } from "../../../Hooks/PagesHooks/usePaymentListUser.js";
const URL = import.meta.env.VITE_URL;

export const CheckoutForm = () => {
  const token = useUser();
  const { filteredPaymentListUser } = usePaymentListUser(token);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountOffer, setDiscountOffer] = useState(0);
  const [discountCupon, setDiscountCupon] = useState(0);
  const [taxIva, setTaxIva] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const products = filteredPaymentListUser.map((product) => ({
        id: product.ID_product,
        ID_payment: product.ID_payment,
        name: product.name,
        quantity: product.product_amount,
        price: product.product_price,
      }));

      const response = await fetch(`${URL}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount * 100,
          products: products,
          shippingCost: shippingCost * 100,
          discountOffer: discountOffer * 100,
          discountCupon: discountCupon * 100,
          taxIva: taxIva * 100,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();

        console.log(responseData.data);

        window.location.href = responseData.data.url;
      } else {
        const errorData = await response.json();
        console.error("Error al realizar el pago:", errorData);
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
    setLoading(false);
  };
  return (
    <CheckoutCard
      handlerSubmit={handlerSubmit}
      product={filteredPaymentListUser}
      setTotalAmount={setTotalAmount}
      setDiscountCupon={setDiscountCupon}
      setDiscountOffer={setDiscountOffer}
      setShippingCost={setShippingCost}
      setTaxIva={setTaxIva}
      loading={loading}
    />
  );
};
