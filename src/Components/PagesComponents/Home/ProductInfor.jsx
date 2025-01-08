export const ProductInfor = () => {
  return (
    <section className="product-info">
      <h2 className="product-info-title">Acerca de nuestros productos</h2>
      <p className="product-info-paragraph">
        Nuestros jabones están elaborados artesanalmente con los mejores
        ingredientes naturales. Obtenemos aceites orgánicos y productos
        botánicos para crear jabones lujosos y nutritivos que son suaves para la
        piel y respetuosos con el medio ambiente. Cada barra está cuidadosamente
        formulada para brindar una combinación única de aromas y beneficios, lo
        que garantiza una experiencia de baño placentera.
      </p>
      <div className="product-info-list">
        <img className="product-info-logo" src="/img/luneva.png" alt="Logo" />
        <ul>
          <li>Ingredientes 100 % naturales.</li>
          <li>Sin fragancias ni colorantes artificiales.</li>
          <li>Respetuosos con el medio ambiente.</li>
          <li>Biodegradable y ecológico.</li>
          <li>Apto para todo tipo de piel.</li>
        </ul>
      </div>
    </section>
  );
};
