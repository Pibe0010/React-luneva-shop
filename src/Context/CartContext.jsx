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

  const { listTrolley, addTrolley, deleteTrolley, updateTrolley } =
    useTrolleyList(token);

  const {
    filteredProductList,
    handleSortChange,
    sortOptions,
    defaultSort,
    addProduct,
  } = useProductList(token);

  useEffect(() => {
    setCart(listTrolley);
  }, [listTrolley]);

  const addToCart = async (data) => {
    try {
      const existingProduct = cart.find(
        (item) => item.ID_product === data.ID_product
      );
      if (existingProduct) {
        // Si el producto ya existe, actualiza solo la cantidad localmente
        const updatedCart = cart.map((item) =>
          item.ID_product === data.ID_product
            ? { ...item, quantity: item.products_amount + data.products_amount }
            : item
        );

        setCart(updatedCart);
        const response = await fetch(`${URL}/trolley/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Producto creado sastifactorio:", responseData.message);

          updateTrolley(responseData.data);
          addProduct();

          console.log("Producto actualizado a la lista:", responseData.data);

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
          console.error("Error al actualizar el producto:", errorData);

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
      } else {
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

          addTrolley(responseData.data);
          addProduct();

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
        deleteTrolley(responseData.data);
        addProduct();

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
        console.error("Error al realizar la operación:");
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
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
        console.error("Error al realizar la operación:");
      }
    } catch (error) {
      console.error("Error al realizar la operación:", error);
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
