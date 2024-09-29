import { Box, Typography } from "@mui/material";
import locationIcon from "../../assets/icons/location.png";
import clockIcon from "../../assets/icons/clock.png";
import React, { useContext } from "react";
import MyContext from "../Context/MyContext";

function FilialInfo({ item }) {
  const {isUzbek} = useContext(MyContext);
  return (
    <Box>
      <Typography fontWeight={"bold"}>
        {isUzbek ? item.addresseUZ : item.addresseRU}
      </Typography>
      <Box display="flex" gap={1} marginTop={1} alignItems="center">
        <Box sx={{ width: "25px", height: "25px" }}>
          <img src={locationIcon} alt="" />
        </Box>
        <Typography
          component="a"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            maxWidth: "80%", 
          }}
        >
          {isUzbek ? item.locationUZ : item.locationRU}
        </Typography>
      </Box>
      <Box display="flex" gap={1} marginTop={1} alignItems="center">
        <Box sx={{ width: "25px", height: "25px" }}>
          <img src={clockIcon} alt="" />
        </Box>
        <a href="" target="_blank" rel="noopener noreferrer">
          10:00 - 22:00
        </a>
      </Box>
    </Box>
  );
}

export default FilialInfo;
