// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "./AutContext.jsx";
const URL = import.meta.env.VITE_URL;
import { useTrolleyList } from "../Hooks/PagesHooks/useTrolleyList.js";
import { useProductList } from "../Hooks/PagesHooks/useProductList.js";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = useUser();
  const [cart, setCart] = useState([]);

  const { listTrolley, addTrolley, deleteTrolley } = useTrolleyList(token);
  const {
    filteredProductList,
    handleSortChange,
    sortOptions,
    defaultSort,
    addProduct,
  } = useProductList(token);

  useEffect(() => {
    setCart(
      listTrolley.map((item) => ({
        ...item,
        products_amount: item.products_amount || 1,
      }))
    );
  }, [listTrolley]);

  const addToCart = async (data, onAddProduct) => {
    try {
      const response = await fetch(`${URL}/trolley`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto creado sastifactorio:", responseData.message);

        onAddProduct(responseData.data);

        setCart((prevCart) => {
          const existingProductIndex = prevCart.findIndex(
            (item) => item.ID_trolley === responseData.data.ID_trolley
          );

          if (existingProductIndex >= 0) {
            const updatedCart = [...prevCart];
            updatedCart[existingProductIndex] = {
              ...updatedCart[existingProductIndex],
              products_amount: responseData.data.products_amount, // Usa el valor actualizado del backend
            };
            return updatedCart;
          } else {
            return [...prevCart, { ...responseData.data }];
          }
        });

        addTrolley(responseData.data);

        console.log("Producto agregado a la lista:", responseData.data);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Producto añadido con exito.`,
        });
      } else {
        const errorData = await response.json();
        console.error("Error al añadir el producto:", errorData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: errorData.message,
        });
      }
    } catch (error) {
      console.error("Error durante la inserciòn del producto:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`${URL}/trolley/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto eliminado correctamente", responseData);
        setCart((prevCart) =>
          prevCart.filter(
            (item) => item.ID_trolley !== responseData.data.ID_trolley
          )
        );
        deleteTrolley(responseData.data.ID_trolley);
        addProduct(responseData.data);

        const successMessage = `Producto eliminado con éxito`;

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          text: successMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Hubo un problema al eliminar el producto",
        });
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      Swal.fire({
        icon: "error",
        text: "Hubo un problema al realizar la operación",
      });
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${URL}/delete/trolley`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log("Producto eliminado correctamente", responseData);
        setCart([]);
        const successMessage = `Producto eliminado con éxito`;

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          text: successMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Hubo un problema al eliminar el producto",
        });
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
      Swal.fire({
        icon: "error",
        text: "Hubo un problema al realizar la operación",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        filteredProductList,
        handleSortChange,
        sortOptions,
        defaultSort,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
