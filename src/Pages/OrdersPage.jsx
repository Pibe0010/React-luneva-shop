import { useEffect, useState } from "react";
import { useUser } from "../Context/AutContext.jsx";
import { useOrderList } from "../Hooks/PagesHooks/useOrderList.js";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { OrderList } from "../Components/PagesComponents/Order/OrderList.jsx";
import { MoreOrder } from "../Components/PagesComponents/Order/MoreOrder.jsx";
import { StatusOrderController } from "../Components/PagesComponents/Order/StatusOrderController.jsx";
import { UpdateOrder } from "../Components/PagesComponents/Order/UpdateOrder.jsx";
import { DeleteOrderModal } from "../Components/PagesComponents/Order/DeleteOrderModal.jsx";
import { OrderListTable } from "../Components/PagesComponents/Order/OrderListTable.jsx";
import { CreateOrder } from "../Components/Forms/CreateOrder/CreateOrder.jsx";

export const OrdersPage = () => {
  const token = useUser();

  const {
    filteredOrderList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addOrder,
    deleteOrder,
    activeOrder,
    updateOrder,
  } = useOrderList(token);

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
          <CreateOrder onAddOffer={addOrder} token={token} />
          <FilterPage options={filterOptions} onChange={handleFilterChange} />
          <SortPage options={sortOptions} onSort={handleSortChange} />
          <ToggleMode
            onClick={() => setIsListView((prev) => !prev)}
            isListView={isListView}
          />
        </nav>
        {isListView ? (
          <ol id="offer_list" className="main_olist">
            {filteredOrderList.length > 0 ? (
              filteredOrderList.map((order) => (
                <li key={order.ID_order} id="element_offer_container">
                  <OrderList
                    order={order}
                    updateOrder={updateOrder}
                    deleteOrder={deleteOrder}
                    activeOrder={activeOrder}
                  />
                  <span id="product_actions" className="main_actions">
                    <MoreOrder offer={order} />
                    <StatusOrderController
                      id={order.ID_order}
                      isActive={order.active}
                      activeOrder={activeOrder}
                      token={token}
                    />
                    <UpdateOrder
                      id={order.ID_order}
                      onUpdateOrder={updateOrder}
                      offerData={order}
                      formTypes="order"
                    />
                    <DeleteOrderModal
                      id={order.ID_order}
                      onDelete={deleteOrder}
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
          <OrderListTable
            order={filteredOrderList}
            updateOrder={updateOrder}
            deleteOrder={deleteOrder}
            activeOrder={activeOrder}
          />
        )}
      </section>
    </MainLayout>
  );
};
