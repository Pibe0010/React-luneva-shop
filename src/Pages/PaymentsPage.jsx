import { useEffect, useState } from "react";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { DeletePaymentModal } from "../Components/PagesComponents/Payment/DeletePaymentModal.jsx";
import { MorePayment } from "../Components/PagesComponents/Payment/MorePayment.jsx";
import { PaymentList } from "../Components/PagesComponents/Payment/PaymentList.jsx";
import { PaymentListTable } from "../Components/PagesComponents/Payment/PaymentListTable.jsx";
import { useUser } from "../Context/AutContext.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { usePaymentList } from "../Hooks/PagesHooks/usePaymentList.js";
import { UpdatePayment } from "../Components/PagesComponents/Payment/UpdatePayment.jsx";

export const PaymentsPage = () => {
  const token = useUser();

  const {
    filteredPaymentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    deletePayment,
    activePayment,
    updatePayment,
  } = usePaymentList(token);

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
    { label: "Pagado", value: "paid" },
    { label: "Cancelado", value: "cancelled" },
  ];

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Pagos (ASC)", value: "pagos-asc" },
    { label: "Pagos (DSC)", value: "pagos-desc" },
    { label: "Total (ASC)", value: "total-asc" },
    { label: "Total (DSC)", value: "total-desc" },
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
            {filteredPaymentList.length > 0 ? (
              filteredPaymentList.map((payment) => (
                <li key={payment.ID_payment} id="element_payment_container">
                  <PaymentList
                    payment={payment}
                    updatePayment={updatePayment}
                    deletePayment={deletePayment}
                    activePayment={activePayment}
                  />
                  <span id="product_actions" className="main_actions">
                    <MorePayment payment={payment} />
                    <UpdatePayment
                      id={payment.ID_payment}
                      onUpdatePayment={updatePayment}
                      paymentData={payment}
                      formTypes="payment"
                    />
                    <DeletePaymentModal
                      id={payment.ID_payment}
                      onDelete={deletePayment}
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
          <PaymentListTable
            payment={filteredPaymentList}
            updatePayment={updatePayment}
            deletePayment={deletePayment}
            activePayment={activePayment}
          />
        )}
      </section>
    </MainLayout>
  );
};
