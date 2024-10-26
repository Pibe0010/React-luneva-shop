import { useEffect, useState } from "react";
import { useUser } from "../Context/AutContext.jsx";
import { useOfferList } from "../Hooks/PagesHooks/useOfferList.js";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { CreateOffer } from "../Components/Forms/CreateOffer/CreateOffer.jsx";
import { OfferList } from "../Components/PagesComponents/Offer/OfferList.jsx";
import { OfferListTable } from "../Components/PagesComponents/Offer/OfferListTable.jsx";

export const OffersPage = () => {
  const token = useUser();

  const {
    filteredOfferList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addOffer,
    deleteOffer,
    activeOffer,
    updateOffer,
  } = useOfferList(token);

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 860);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterOptions = [
    { label: "Activo", value: "1" },
    { label: "Inactivo", value: "0" },
  ];

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Descuento (ASC)", value: "discount-asc" },
    { label: "Descuento (DSC)", value: "discount-desc" },
    { label: "Pricio (ASC)", value: "price-asc" },
    { label: "Pricio (DSC)", value: "price-desc" },
  ];
  return (
    <MainLayout>
      <section id="offer_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPage onSearch={handleSearch} />
          <CreateOffer onAddOffer={addOffer} token={token} />
          <FilterPage options={filterOptions} onChange={handleFilterChange} />
          <SortPage options={sortOptions} onSort={handleSortChange} />
          <ToggleMode
            onClick={() => setIsListView((prev) => !prev)}
            isListView={isListView}
          />
        </nav>
        {isListView ? (
          <ol id="offer_list" className="main_olist">
            {filteredOfferList.length > 0 ? (
              filteredOfferList.map((offer) => (
                <li key={offer.ID_offer} id="element_offer_container">
                  <OfferList
                    offer={offer}
                    updateCustomer={updateOffer}
                    deleteCustomer={deleteOffer}
                    activeCustomer={activeOffer}
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay listas disponibles</div>
            )}
          </ol>
        ) : (
          <OfferListTable
            customer={filteredOfferList}
            updateCustomer={updateOffer}
            deleteCustomer={deleteOffer}
            activeCustomer={activeOffer}
          />
        )}
      </section>
    </MainLayout>
  );
};
