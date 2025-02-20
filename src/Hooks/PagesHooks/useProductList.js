import { useEffect, useState } from "react";
import { ToastAlert } from "../../Components/Alerts/ToastAlert.jsx";
const URL = import.meta.env.VITE_URL;

export const useProductList = (token) => {
  const [listProduct, setListProduct] = useState([]);
  const [initialProductList, setInitialProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listProduct]);

  useEffect(() => {
    if (filteredProductList.length > 0) {
      sortUsers(filteredProductList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getProductList = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Agregar el token solo si existe (usuario autenticado)
      if (token) {
        headers.Authorization = `${token}`;
      }
      const response = await fetch(`${URL}/product/list`, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const responseData = await response.json();
        setListProduct(responseData.data);
        setInitialProductList(responseData.data);
        setFilteredProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Error al obtener la lista:", errorData);
      }
    } catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al obtener la lista de clientes",
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Agregar el token solo si existe (usuario autenticado)
      if (token) {
        headers.Authorization = `${token}`;
      }
      const response = await fetch(
        `${URL}/product/search?searchTerm=${searchTerm}`,
        {
          method: "GET",
          headers,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Busqueda exitosa:", responseData);
        setListProduct(responseData.data);
        setFilteredProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error("Búsqueda fallida:", errorData);
      }
    } catch (error) {
      console.error("Error al buscar clientes:", error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredProductList([...initialProductList]);
    }
  };

  const applyFilters = () => {
    let filtered = listProduct;

    if (selectedFilters.length > 0) {
      filtered = listProduct.filter((customer) => {
        let activeFilter = true;

        if (selectedFilters.includes("1") && selectedFilters.includes("0")) {
          activeFilter = true; // Muestra tanto activos como inactivos
        } else if (selectedFilters.includes("1")) {
          activeFilter = customer.active;
        } else if (selectedFilters.includes("0")) {
          activeFilter = !customer.active;
        }

        return activeFilter;
      });
    }

    setFilteredProductList(filtered);
    sortUsers(filtered);
  };

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredProductList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case "nombre-asc":
        sortedList.sort((a, b) =>
          a.name.localeCompare(b.name, { sensitivity: "base" })
        );
        break;
      case "nombre-desc":
        sortedList.sort((a, b) =>
          b.name.localeCompare(a.name, { sensitivity: "base" })
        );
        break;
      case "ref-asc":
        sortedList.sort((a, b) => a.ref_PR.localeCompare(b.ref_PR));
        break;
      case "ref-desc":
        sortedList.sort((a, b) => b.ref_PR.localeCompare(a.ref_PR));
        break;
      case "stock-asc":
        sortedList.sort((a, b) => a.Stock - b.Stock);
        break;
      case "stock-desc":
        sortedList.sort((a, b) => b.Stock - a.Stock);
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProductList(sortedList);
  };

  const addProduct = async () => {
    try {
      await getProductList();
    } catch (error) {
      console.error("Error al agregar un producto:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al agregar un producto",
      });
    }
  };

  const deleteProduct = async (ID_product) => {
    try {
      setListProduct((prevProduct) =>
        prevProduct.filter((product) => product.ID_product !== ID_product)
      );
      await getProductList();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      ToastAlert.fire({
        icon: "error",
        title: "Error al eliminar el producto",
      });
    }
  };

  const updateProduct = async (updatedProduct) => {
    setListProduct((prevList) =>
      prevList.map((product) =>
        product.ID_product === updatedProduct.ID_product
          ? { ...product, ...updatedProduct }
          : product
      )
    );

    setFilteredProductList((prevList) =>
      prevList.map((product) =>
        product.ID_product === updatedProduct.ID_product
          ? { ...product, ...updatedProduct }
          : product
      )
    );
    await getProductList();
  };

  const activeProduct = (ID_product) => {
    setListProduct((prevList) =>
      prevList.map((product) =>
        product.ID_product === ID_product
          ? { ...product, active: !product.active }
          : product
      )
    );
    setFilteredProductList((prevList) =>
      prevList.map((product) =>
        product.ID_product === ID_product
          ? { ...product, active: !product.active }
          : product
      )
    );
  };
  return {
    filteredProductList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addProduct,
    deleteProduct,
    updateProduct,
    activeProduct,
  };
};
