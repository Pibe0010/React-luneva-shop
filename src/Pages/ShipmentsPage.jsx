import { useEffect, useState } from "react";
import { ShipmentListTable } from "../Components/PagesComponents/Shipment/ShipmentListTable.jsx";
import { useUser } from "../Context/AutContext.jsx";
import { useShipmentList } from "../Hooks/PagesHooks/useShipmentList.js";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { ShipmentList } from "../Components/PagesComponents/Shipment/ShipmentList.jsx";
import { MoreShipment } from "../Components/PagesComponents/Shipment/MoreShipment.jsx";
import { DeleteShipmentModel } from "../Components/PagesComponents/Shipment/DeleteShipmentModel.jsx";
import { UpdateShipment } from "../Components/PagesComponents/Shipment/UpdateShipment.jsx";

export const ShipmentsPage = () => {
  const token = useUser();

  const {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    deleteShipment,
    activeShipment,
    updateShipment,
  } = useShipmentList(token);

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
    { label: "Pendiente", value: "pending" },
    { label: "Enviado", value: "sent" },
    { label: "Entregado", value: "delivered" },
    { label: "Cancelado", value: "cancelled" },
  ];

  const sortOptions = [
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Ref (DSC)", value: "ref-desc" },
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Cantidad (ASC)", value: "product_amount-asc" },
    { label: "cantidad (DSC)", value: "product_amount-desc" },
  ];

  return (
    <MainLayout>
      <section id="order_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPage onSearch={handleSearch} />
          <FilterPage options={filterOptions} onChange={handleFilterChange} />
          <SortPage options={sortOptions} onSort={handleSortChange} />
          <ToggleMode
            onClick={() => setIsListView((prev) => !prev)}
            isListView={isListView}
          />
        </nav>
        {isListView ? (
          <ol id="offer_list" className="main_olist">
            {filteredShipmentList.length > 0 ? (
              filteredShipmentList.map((shipment) => (
                <li key={shipment.ID_shipment} id="element_order_container">
                  <ShipmentList
                    shipment={shipment}
                    updateShipment={updateShipment}
                    deleteShipment={deleteShipment}
                    activeShipment={activeShipment}
                  />
                  <span id="product_actions" className="main_actions">
                    <MoreShipment shipment={shipment} />
                    <UpdateShipment
                      id={shipment.ID_shipment}
                      onUpdateShipment={updateShipment}
                      shipmentData={shipment}
                      formTypes="shipment"
                    />
                    <DeleteShipmentModel
                      id={shipment.ID_shipment}
                      onDelete={deleteShipment}
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
          <ShipmentListTable
            shipment={filteredShipmentList}
            updateShipment={updateShipment}
            deleteShipment={deleteShipment}
            activeShipment={activeShipment}
          />
        )}
      </section>
    </MainLayout>
  );
};
