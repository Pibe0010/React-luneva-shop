import { useEffect, useState } from "react";
import { useUser } from "../Context/AutContext.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { useTicketList } from "../Hooks/PagesHooks/useTicketList.js";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { TicketList } from "../Components/PagesComponents/TicketPurchases/TicketList.jsx";
import { MoreTicket } from "../Components/PagesComponents/TicketPurchases/MoreTicket.jsx";
import { DeleteTicketModal } from "../Components/PagesComponents/TicketPurchases/DeleteTicketModal.jsx";
import { TicketListTable } from "../Components/PagesComponents/TicketPurchases/TicketListTable.jsx";

export const TicketPurchasesPage = () => {
  const token = useUser();

  const {
    filteredTicketsList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    deleteTicket,
    activeTicket,
    updateTicket,
  } = useTicketList(token);

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
    { label: "Fecha", value: "createdAt" },
    { label: "Perejil", value: "perejil" },
  ];

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Monto Prod (ASC)", value: "product_amount-asc" },
    { label: "Monto Prod (DSC)", value: "product_amount-desc" },
    { label: "Pricio (ASC)", value: "price-asc" },
    { label: "Pricio (DSC)", value: "price-desc" },
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Ref (DSC)", value: "ref-desc" },
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
            {filteredTicketsList && filteredTicketsList.length > 0 ? (
              filteredTicketsList.map((ticket) => (
                <li key={ticket.ID_ticket} id="element_ticket_container">
                  <TicketList
                    ticket={ticket}
                    updateTicket={updateTicket}
                    deleteTicket={deleteTicket}
                    activeTicket={activeTicket}
                  />
                  <span id="product_actions" className="main_actions">
                    <MoreTicket ticket={ticket} />
                    <DeleteTicketModal
                      id={ticket.ID_ticket}
                      onDelete={deleteTicket}
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
          <TicketListTable
            ticket={filteredTicketsList}
            updateTicket={updateTicket}
            deleteTicket={deleteTicket}
            activeTicket={activeTicket}
          />
        )}
      </section>
    </MainLayout>
  );
};
