import "./Card.css";

export const Card = ({ title, btnName, src, alt, description, price }) => {
  return (
    <div className="card">
      <div className="card-image_container">
        <img className="image" src={src} alt={alt} />
      </div>
      <div className="card-title">
        <span>Jabòn de {title}</span>
      </div>
      <div className="container-description">
        <span></span>
        <div className="description">{description}</div>
      </div>
      <div className="action">
        <div className="price">
          <span>{price}€</span>
        </div>
        <button className="cart-button">
          <svg
            className="cart-icon"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
          <span>{btnName}</span>
        </button>
      </div>
    </div>
  );
};
