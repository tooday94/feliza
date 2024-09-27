import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import MyContext from "../../Context/MyContext";
import { getAllProduct } from "../../../api/Product";
import SmallSlider from "../../Sliders/SmallSlider";

function LastSeenSLider() {
  const { lastSeenList, isUzbek } = useContext(MyContext);
  console.log(lastSeenList);

  return (
    <Box marginTop={3}>
      <Typography variant="h5" paddingY={1} marginLeft={1}>
      {
        isUzbek? "Oxirgi ko'rilgan mahsulotlar" : "Недавно просмотренные товары"
      }
      </Typography>
      <SmallSlider list={lastSeenList} />
    </Box>
  );
}

export default LastSeenSLider;
