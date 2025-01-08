import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./ImageSlider.css";

export const ImageSlider = () => {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img className="slider-img" src="/img/luneva.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="slider-img"
            src="/img/pexels-monstera-production-6621497.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="slider-img"
            src="/img/pexels-monstera-production-6621323.jpg"
            alt=""
          />
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
};
