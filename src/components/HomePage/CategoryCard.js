import React from "react";
import { Box, styled, Typography } from "@mui/material";
import UnderlineButton from "../Global/Buttons/UnderlineButton";
import { Link } from "react-router-dom";

function CategoryCard({ item }) {
  return (
    <Link to={`/products/${item.link}`}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        paddingX={1}
        flexDirection={"column"}
        marginBottom={3}
        gap={1}
      >
        <Box
          sx={{
            height: { xs: "70vh", lg: "90vh" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img src={item.url} alt="" />
        </Box>
        <Box sx={{ border: "1px solid black", textAlign: "center" }}>
          <Typography variant="h5">{item.title}</Typography>
        </Box>
      </Box>
    </Link>
  );
}

export default CategoryCard;
