import "./trolleyBackBtn.css";
export const TrolleyBackBtn = ({ url }) => {
  const handleClick = () => {
    window.location.href = url;
  };

  return <button className="cartPage-back" onClick={handleClick}></button>;
};
