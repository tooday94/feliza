import { Box, Grid, Typography, Card } from "@mui/material";
import React, { useContext } from "react";
import { categoryIconList } from "../../data/DataList";
import MyContext from "../Context/MyContext";

function CategoryIconsBox() {
  const { isUzbek } = useContext(MyContext);

  return (
    <Box
      padding={1}
      marginY={1}
      sx={{ borderTop: "3px solid black", borderBottom: "3px solid black" }}
    >
      <Grid container spacing={2}>
        {categoryIconList.map((item, idx) => {
          return (
            <Grid item xs={3} key={item.nameRU + item.nameUZ}>
              <Box sx={{ height: "22vw", width: "100%" }}>
                <Card sx={{ height: "100%", width: "100%" }}>
                  <img src={item.url} alt="" />
                </Card>
              </Box>
              <Box sx={{ marginTop: 1, textAlign: "center" }}>
                <Typography fontSize={12}>
                  {isUzbek ? item.nameUZ : item.nameRU}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CategoryIconsBox;
