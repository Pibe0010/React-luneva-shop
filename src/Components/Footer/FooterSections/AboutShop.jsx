import "./AboutShop.css";
export const AboutShop = () => {
  return (
    <div className="aboutContainer">
      <h3 className="aboutTitle">Acerca de la tienda</h3>
      <p className="aboutText">
        Luneva Shop ofrece una exclusiva selección de jabones artesanales 100%
        naturales, elaborados a mano con ingredientes cuidadosamente
        seleccionados. Cada jabón es creado con técnicas tradicionales,
        utilizando aceites esenciales, y extractos naturales.{" "}
      </p>
      <div className="aboutContactContainer">
        <p className="aboutContactTitle">Contacto</p>
        <p className="aboutContactEmail">lunevaShop@gmail.com</p>
      </div>
    </div>
  );
};
