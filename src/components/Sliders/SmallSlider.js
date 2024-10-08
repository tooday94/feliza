import { Box, Typography } from "@mui/material";
import React, { Component } from "react";
import ProductCard from "../Global/Cards/ProductCard";
import Slider from "react-slick";
import SmallSliderCards from "../Global/Cards/SmallSliderCards";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function SmallSlider({ list }) {
 

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 100,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   variableWidth: true,
  // };
  return (
    <div className="slider-box" style={{ paddingBottom: "10px" }}>
      {/* <Slider {...settings}>
        {list.map((item) => {
          return (
            <Box
              className="smallSliderBox"
              sx={{ pr: 1, paddingY: 1 }}
              key={item?.referenceNumber}
            >
              <SmallSliderCards item={item} />
            </Box>
          );
        })}
      </Slider> */}

      <Swiper
        spaceBetween={10}
        loop={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          // when window width is >= 320px (mobile)
          320: {
            slidesPerView: 2.5,
          },
          // when window width is >= 768px (tablet)
          768: {
            slidesPerView: 3.5,
          },
          // when window width is >= 1024px (desktop)
          1024: {
            slidesPerView: 4.5,
          },
        }}
        className="mySwiper"
      >
        {list.map((item, idx) => {
          const key = `slide-${item?.id || idx}`; // Generate unique key using item id and fallback to index

          return (
            <SwiperSlide key={key}>
              <Box className="smallSliderBox" sx={{ paddingY: 1 }}>
                <SmallSliderCards item={item} />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SmallSlider;
