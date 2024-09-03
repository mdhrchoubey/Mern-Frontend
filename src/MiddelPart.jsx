import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "./image/school1.jpg"
import image2 from "./image/school2.jpg"
import image3 from "./image/school3.jpg"
import image4 from "./image/school4.jpeg"
import image5 from "./image/school5.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './MiddelPart.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import required modules
// import { EffectCoverflow, Pagination } from 'swiper/modules';

const MiddelPart=()=> {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide ><img src={image1} alt='no Image'/></SwiperSlide>
        <SwiperSlide><img src={image2} alt='no Image'/></SwiperSlide>
        <SwiperSlide><img src={image3} alt='no Image'/></SwiperSlide>
        <SwiperSlide><img src={image4} alt='no Image'/></SwiperSlide>
        <SwiperSlide><img src={image5} alt='no Image'/></SwiperSlide>
        {/* <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
export default MiddelPart
