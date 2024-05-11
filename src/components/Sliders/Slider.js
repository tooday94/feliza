import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllKaruselSlides } from "../../api/Karusel";
import Skeleton from "@mui/material/Skeleton";

const SliderMain = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllKaruselSlides();
      if (res.success) {
        setList(res.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNavigate = (linkType, id) => {
    switch (linkType) {
      case "product_id":
        navigate(`/product/${id}`);
        break;
      case "category_id":
        navigate(`/products/${id}`);
        break;
      case "look_id":
        navigate(`/look/${id}`);
        break;
      default:
        navigate("/");
        break;
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    adaptiveHeight: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {!isLoading ? (
          list.map((item, idx) => (
            <Box
              className="slide"
              sx={{ height: { xs: "40vh", md: "92vh" } }}
              key={idx + item.karuselType}
              onClick={() => handleNavigate(item.karuselType, item.parameterId)}
            >
              <img src={item?.productImages[0]?.url} alt="" />
            </Box>
          ))
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ height: { xs: "40vh", md: "92vh" }, width: "100vw" }}
          />
        )}
      </Slider>
    </div>
  );
};

export default SliderMain;
