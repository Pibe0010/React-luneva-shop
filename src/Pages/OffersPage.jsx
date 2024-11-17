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
import { StatusOfferController } from "../Components/PagesComponents/Offer/StatusOfferController.jsx";
import { UpdateOffer } from "../Components/PagesComponents/Offer/UpdateOffer.jsx";
import { DeleteOfferModal } from "../Components/PagesComponents/Offer/DeleteOfferModal.jsx";
import { MoreOffer } from "../Components/PagesComponents/Offer/MoreOffer.jsx";

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
  console.log(filteredOfferList);

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
                    updateOffer={updateOffer}
                    deleteOffer={deleteOffer}
                    activeOffer={activeOffer}
                  />
                  <span id="product_actions" className="main_actions">
                    <MoreOffer offer={offer} />
                    <StatusOfferController
                      id={offer.ID_offer}
                      isActive={offer.active}
                      activeOffer={activeOffer}
                      token={token}
                    />
                    <UpdateOffer
                      id={offer.ID_offer}
                      onUpdateOffer={updateOffer}
                      offerData={offer}
                      formTypes="offer"
                    />
                    <DeleteOfferModal
                      id={offer.ID_offer}
                      onDelete={deleteOffer}
                      token={token}
                    />
                  </span>
                </li>
              ))
            ) : (
              <div className="noResult">No hay listas disponibles</div>
            )}
          </ol>
        ) : (
          <OfferListTable
            offer={filteredOfferList}
            updateOffer={updateOffer}
            deleteOffer={deleteOffer}
            activeOffer={activeOffer}
          />
        )}
      </section>
    </MainLayout>
  );
};
