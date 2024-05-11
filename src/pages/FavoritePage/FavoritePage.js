import { Box, Typography, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import MyContext from "../../components/Context/MyContext";
import SmallCards from "../../components/Global/Cards/SmallCards";
import { getAllProduct } from "../../api/Product";
import boxIcon from "../../assets/icons/empty.png";
import { getLikedItems } from "../../api/LikedList";

function FavoritePage() {
  const { likedList } = useContext(MyContext);
  const [list, setList] = useState([]);
  const { user } = useContext(MyContext);

  useEffect(() => {
    setList(likedList.map((item) => item.product));
  }, [likedList]);

  return (
    <Box>
      <Box sx={{ marginTop: "75px" }} id="favorite_page">
        {list.map((item, idx) => (
          <Box
            key={item.id}
            sx={{
              borderBottom:
                idx === list.length - 1
                  ? "none"
                  : "1px solid rgb(234, 87, 116)",
            }}
          >
            <SmallCards item={item} />
          </Box>
        ))}
      </Box>

      {likedList.length == 0 && (
        <Box marginTop={12}>
          <Grid
            container
            spacing={2}
            display={"flex"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={7}>
              <Box sx={{ width: "50%", margin: "auto" }}>
                <img src={boxIcon} alt="" />
              </Box>
              <Typography>
                Sizda hozircha saralangan mahsulotlar röyxati mavjud emas
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default FavoritePage;
