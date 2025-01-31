import "./ProfileCard.css";
export const ProfileCard = ({ onClick, url, alt, description, name }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-details">
        <img className="profile-text-title" src={url} alt={alt} />
        <p className="profile-text-body">{description}</p>
      </div>
      <button className="prfile-card-button" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};
