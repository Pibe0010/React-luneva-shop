import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_URL;

export const useUnsignedProductOffer = (token, reload) => {
  const [unsignedProduct, setUnsignedProduct] = useState([]);

  useEffect(() => {
    const fetchUnasignedProduct = async () => {
      try {
        const response = await fetch(`${URL}/offer/unsigned-products`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnsignedProduct(data.data);
        } else {
          console.error("Error al obtener los productos sin activar");
          setUnsignedProduct([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        setUnsignedProduct([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchUnasignedProduct();
  }, [token, reload]);

  return unsignedProduct;
};
