import { SpecialCard } from "../Components/PagesComponents/SpecialOffer/SpecialCard.jsx";
import { MainLayout } from "../Layout/MainLayout.jsx";
import "../Styles/Pages/SpecialOfferPage.css";
import { useOfferList } from "../Hooks/PagesHooks/useOfferList.js";
import { useUser } from "../Context/AutContext.jsx";
import { OffertitleAnimation } from "../Components/PagesComponents/SpecialOffer/OffertitleAnimation.jsx";
import { SubTitleAnimate } from "../Components/PagesComponents/SpecialOffer/SubTitleAnimate.jsx";

export const SpecialOfferPage = () => {
  const token = useUser();
  const { filteredOfferList } = useOfferList(token);

  return (
    <MainLayout>
      <section className="special-offer-container">
        <h1 className="special-title">
          <OffertitleAnimation />
        </h1>
        <section>
          <p className="special-offer-description">
            No pierdas la opurtinadad de adquirir nuestros productos especiales
            con descuentos. cuida tu piel, has un regalo, con nuestros jabones
            naturales.
          </p>
        </section>
        <h2 className="special-offer-card-title">
          <SubTitleAnimate />
        </h2>
        <section className="special-offer-card">
          <div className="special-offer-card-container">
            {filteredOfferList.length > 0 ? (
              filteredOfferList.map((offer) => (
                <SpecialCard
                  key={offer.ID_Product}
                  id={offer.ID_Product}
                  products={offer}
                />
              ))
            ) : (
              <div>
                <p className="special-offer-card-empty">
                  No hay ofertas disponibles en estos momentos. Registrate para
                  saber más de nuestras ofertas cuando esten disponibles.
                </p>
              </div>
            )}
          </div>
        </section>
      </section>
    </MainLayout>
  );
};
