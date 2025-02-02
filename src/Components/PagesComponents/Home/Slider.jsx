import { HomeTitle } from "../../Animations/HomeTitle.jsx";
import { ImageSlider } from "./ImageSlider.jsx";

export const Slider = () => {
  return (
    <section className="home-header">
      <div className="home-slider-img">
        <ImageSlider />
      </div>
      <div className="home-text">
        <HomeTitle />
        <p className="home-paragraph"></p>
        <div className="home-logo-img"></div>
      </div>
    </section>
  );
};
