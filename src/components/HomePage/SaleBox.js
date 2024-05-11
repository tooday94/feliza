import React from "react";
import { Box, Typography, Button } from "@mui/material";
import UnderlineButton from "../Global/Buttons/UnderlineButton";
import { Link } from "react-router-dom";
import HeaderSlider from "../Sliders/HeaderSlider";

function SaleBox() {
  return (
    <Link to="/products/sale">
      <Box
        sx={{
          width: "100%",
          height: "4vh",
          justifyContent: "center",
          display: "flex",
          border: "1px solid grey",
          marginY: 1,
        }}
      >
        <HeaderSlider />
      </Box>
    </Link>
  );
}

export default SaleBox;
