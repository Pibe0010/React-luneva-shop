import { useState } from "react";
import { BtnFilters } from "../../Buttons/ButtonFilter/BtnFilters.jsx";
import "./SideBarFilter.css";
import { BtnFilterAction } from "../../Buttons/ButtonFilter/BtnFilterActions.jsx";

export const SideBarFilter = ({ setFilter, onSort, defaultSort, products }) => {
  const [priceRange, setPriceRange] = useState(100);

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange(value);

    setFilter(value);
  };

  const sortOptions = [
    { name: "Stock acendente", value: "stock-asc" },
    { name: "Stock desendente", value: "stock-desc" },
    { name: "Precio acendente", value: "price-asc" },
    { name: "Precio desendente", value: "price-desc" },
  ];

  const addClass = products.length >= 5 ? "" : "filterFixed";

  return (
    <section className="sidebar-filter">
      <h1 className="slider-title">Productos</h1>
      <div className={`sidebar-menu-container ${addClass}`}>
        <div>
          <h2>Filtros</h2>
          <ul>
            <li>
              <BtnFilterAction onClick={() => setFilter("all")} name="Todos" />
            </li>
            <li>
              <BtnFilterAction
                onClick={() => setFilter("Jabones")}
                name="Jabones"
              />
            </li>
            <li>
              <BtnFilterAction
                onClick={() => setFilter("Perfumes")}
                name="Perfumes"
              />
            </li>
            <li>
              <BtnFilterAction
                onClick={() => setFilter("Libros")}
                name="Libros"
              />
            </li>
          </ul>
        </div>
        <div>
          <h2>Ordenar por</h2>
          <ul>
            <li>
              <BtnFilters
                options={sortOptions}
                onSort={onSort}
                defaultSort={defaultSort}
              />
            </li>
          </ul>
        </div>
        <div className="slider-price-range">
          <h2>Rango de precios</h2>
          <input
            className="slider-input-range"
            type="range"
            min="0"
            max="100"
            step="1"
            value={priceRange}
            onChange={handleRangeChange}
          />
          <p className="price-range-value">Precio máximo: {priceRange} €</p>
        </div>
      </div>
    </section>
  );
};
