import { useEffect, useState } from "react";
import { AddressListTable } from "../Components/PagesComponents/Address/AddressListTable.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";
import { useUser } from "../Context/AutContext.jsx";
import { AddressList } from "../Components/PagesComponents/Address/AddressList.jsx";
import { SearchPage } from "../Components/Navpages/SearchPage.jsx";
import { SortPage } from "../Components/NavPages/SortPage.jsx";
import { ToggleMode } from "../Components/NavPages/ToggleMode.jsx";
import { useAddressListAdmin } from "../Hooks/PagesHooks/useAddressListAdmin.js";

export const AddressPage = () => {
  const token = useUser();
  const {
    filteredAddressList,
    handleSearch,
    handleSortChange,
    addAddress,
    deleteAddress,
    updateAddress,
  } = useAddressListAdmin(token);

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

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Calle (ASC)", value: "address-asc" },
    { label: "Calle (DSC)", value: "address-desc" },
    { label: "Numero (ASC)", value: "street_number-asc" },
    { label: "Numero (DSC)", value: "street_number-desc" },
  ];

  return (
    <MainLayout>
      <section id="order_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPage onSearch={handleSearch} />
          <SortPage options={sortOptions} onSort={handleSortChange} />
          <ToggleMode
            onClick={() => setIsListView((prev) => !prev)}
            isListView={isListView}
          />
        </nav>
        {isListView ? (
          <ol id="offer_list" className="main_olist">
            {filteredAddressList.length > 0 ? (
              filteredAddressList.map((address) => (
                <li key={address.ID_address} id="element_order_container">
                  <AddressList
                    address={address}
                    updateAddress={updateAddress}
                    deleteAddress={deleteAddress}
                    addAddress={addAddress}
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay listas disponibles</div>
            )}
          </ol>
        ) : (
          <AddressListTable
            address={filteredAddressList}
            updateAddress={updateAddress}
            addAddress={addAddress}
            deleteAddress={deleteAddress}
          />
        )}
      </section>
    </MainLayout>
  );
};
