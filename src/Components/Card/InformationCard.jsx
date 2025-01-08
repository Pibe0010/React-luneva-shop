import "./InformationCard.css";

export const InformationCard = ({ url, alt, title, description }) => {
  return (
    <div className="infomation-card">
      <div className="info-card-content">
        <img className="info-card-img" src={url} alt={alt} />
        <p className="info-card-title">{title}</p>
        <p className="info-card-para">{description}</p>
      </div>
    </div>
  );
};
