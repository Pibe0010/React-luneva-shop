import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Notifica cambios al componente padre si se borra el texto
    if (value === "") {
      setSearchTerm("");
      onSearch("");
    }
  };

  return (
    <div className="home-search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={searchTerm}
          onInput={handleInputChange}
          placeholder="Encuentra el jabón perfecto..."
        />
        <button className="btn-search-bar" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};
