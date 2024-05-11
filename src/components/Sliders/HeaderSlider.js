import { Box, Typography, colors } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";

function HeaderSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    adaptiveHeight: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Box>
          <Box
            sx={{
              height: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "black" }}>
              Tezkor yetkazish xizmati
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              height: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "black" }}>Qulay tölov tizimi</Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              height: "4vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "black" }}>Zamonaviy kyimlar</Typography>
          </Box>
        </Box>
      </Slider>
    </div>
  );
}

export default HeaderSlider;
