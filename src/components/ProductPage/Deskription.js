import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Deskription({ value }) {
  

    const makeList = (str) => {
        // Check if the input string is valid and contains '/'
        if (!str || typeof str !== 'string' || !str.includes('/')) {
          return [];
        }
      
        // Split the string by '/'
        const items = str.split('/');
        // Strip leading/trailing whitespace from each item
        return items.map(item => item.trim());
      };

  return (
    <Box>
      {makeList(value)?.map((item, idx) => {
        const key = item + 1;
        return <Typography key={key}>{item}</Typography>;
      })}
    </Box>
  );
}

export default Deskription;
