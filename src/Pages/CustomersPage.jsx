import { useEffect, useState } from "react";
import { FilterPage } from "../Components/NavPages/FilterPage.jsx";

import { useUser } from "../Context/AutContext.jsx";
import { useCustomerList } from "../Hooks/PagesHooks/useCustomerList.js";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { CustomerList } from "../Components/PagesComponents/CustomerList.jsx";
import { CustomerListTable } from "../Components/PagesComponents/CustomerListTable.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import "../Styles/Pages/CustomerPage.css";

export const CustomersPage = () => {
  const token = useUser();

  const {
    filteredCustomerList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    deleteCustomer,
    updateCustomer,
    activeCustomer,
  } = useCustomerList(token);

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
    { label: "Phone (DSC)", value: "phone-desc" },
    { label: "Phone (ASC)", value: "phone-asc" },
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
  ];

  const defaultSort = { label: "Nombre (DSC)", value: "nombre-desc" };
  return (
    <MainLayout>
      <section id="customer_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPage onSearch={handleSearch} />
          <FilterPage options={filterOptions} onChange={handleFilterChange} />
          <SortPage
            options={sortOptions}
            onSort={handleSortChange}
            defaultSort={defaultSort}
          />
          <ToggleMode
            onClick={() => setIsListView((prev) => !prev)}
            isListView={isListView}
          />
        </nav>
        {isListView ? (
          <ol id="customer_list" className="main_olist">
            {filteredCustomerList.length > 0 ? (
              filteredCustomerList.map((customer) => (
                <li key={customer.ID_customer} id="element_customer_container">
                  <CustomerList
                    customer={customer}
                    updateCustomer={updateCustomer}
                    deleteCustomer={deleteCustomer}
                    activeCustomer={activeCustomer}
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay listas disponibles</div>
            )}
          </ol>
        ) : (
          <CustomerListTable
            customer={filteredCustomerList}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
            activeCustomer={activeCustomer}
          />
        )}
      </section>
    </MainLayout>
  );
};
