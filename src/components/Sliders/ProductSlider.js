import { Box } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";

const ProductSlider = ({ list }) => {
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  return (
    <div>
      <Slider {...settings}>
        {list?.map((item, idx) => {
          return (
            <Box
              sx={{ width: "100%", height: "60vh", overflow: "hidden" }}
              key={idx + "123"}
            >
              <img src={item.url} alt="" />
            </Box>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
