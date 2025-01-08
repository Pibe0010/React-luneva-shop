import { InformationCard } from "../../Card/InformationCard.jsx";

export const StoreInfo = () => {
  const infoCards = [
    {
      id: 1,
      icon: "/Icons/local_shipping_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg",
      title: "Envios gratis",
      description: "En pedidos superiores a 50€",
    },
    {
      id: 2,
      icon: "/Icons/payments_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg",
      title: "Precios",
      description: "IVA no incluido en los precios mostrados",
    },
    {
      id: 3,
      icon: "/Icons/lock_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg",
      title: "Pagos seguros",
      description: "Transacciones seguras y encriptadas",
    },
    {
      id: 4,
      icon: "/Icons/eco_45dp_434343_FILL0_wght400_GRAD0_opsz48.svg",
      title: "Ecológico",
      description: "Envases e ingredientes sostenibles",
    },
  ];

  return (
    <section className="store-info">
      <h2 className="store-info-title">Luneva Información</h2>
      <div className="info-cards">
        {infoCards.map((card) => (
          <InformationCard
            key={card.id}
            url={card.icon}
            alt={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};
