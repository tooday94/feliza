import { Box, Button, Card, Typography } from "@mui/material";
import React, { useContext } from "react";
import { categorySliderList, productList } from "../../data/DataList";
import { Link } from "react-router-dom";
import MyContext from "../Context/MyContext";

function MainCategoryContainer({ list }) {
  const { isUzbek } = useContext(MyContext);

  return (
    <Box sx={{ marginY: 3, height: "400px" }} className="main-box">
      <Box id="slider" className="look-slider">
        {list.map((item) => {
          return (
            <Box
              className="scrollable-content"
              key={item.nameUZ}
              sx={{ borderRadius: "10px", overflow: "hidden", width: "60vw" }}
            >
              <Link to={`/products/${item.id}`}>
                <img src={item.url} alt="" />
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: "50px",
                    backgroundColor: "white",
                    color: "black",
                    paddingX: 3,
                    width: "60%",
                  }}
                >
                  <Typography>{isUzbek ? item.nameUZ : item.nameRU}</Typography>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default MainCategoryContainer;
