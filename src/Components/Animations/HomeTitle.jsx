import "./HomeTitle.css";

export const HomeTitle = () => {
  return (
    /* From Uiverse.io by MuhammadHasann */
    <div className="card-init-info">
      <div data-position="top" className="card-init-carousel">
        <span className="card-init-carousel__text">
          • Jabónes Artesanales • Manos Cuerpo Cara • Naturales • Pieles
          Sensibles • Efectividad • Idrata tu Piel • Apto Para Todo Tipo De Piel
          • Jabónes Luneva
        </span>
      </div>
      <div className="crad-init-image">
        <img src="/img/luneva.png" alt="Logo" />
        <img className="card-init-logo" src="/img/luneva.png" alt="Logo" />
      </div>
      <span className="card-init-title">LUNEVA SHOP</span>
      <p className="card-init-paragraph">
        Ofrecemos una exclusiva selección de jabones artesanales 100% naturales,
        elaborados a mano con ingredientes cuidadosamente seleccionados. Cada
        jabón es creado con técnicas tradicionales, utilizando aceites
        esenciales, y extractos naturales. Haz de tu cuidado personal un ritual
        lleno de amor, conciencia y autenticidad. ¡Empieza hoy mismo a disfrutar
        de lo mejor que la naturaleza puede ofrecerte!
      </p>
      <div
        data-direction="right"
        data-position="bottom"
        className="card-init-carousel"
      >
        <span className="card-init-carousel__text">
          • Jabónes Artesanales • Manos Cuerpo Cara • Naturales • Pieles
          Sensibles • Efectividad • Idrata tu Piel • Apto Para Todo Tipo De Piel
          • Jabónes Luneva
        </span>
      </div>
    </div>
  );
};
