import { Box, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../components/Context/MyContext";
import BasketCard from "../../components/Global/Cards/BasketCard";
import { productList } from "../../data/DataList";
import Footer from "../../components/Footer/Footer";
import { getCartItemsByCustomerId } from "../../api/Basket";
import boxIcon from "../../assets/icons/empty.png";

function BasketPage() {
  const { cardItems, isUzbek } = useContext(MyContext);

  let sum = 0;
  

  return (
    <Box sx={{ marginTop: "12vh", minHeight: "75vh", paddingBottom: "5vh" }}>
      <Box aligen="center">
        {cardItems.map((item) => {
          const isSale = item.sale > 0;
          sum = sum + (isSale ? item.salePrice * item.quantity : item.sellPrice * item.quantity);
          return <BasketCard key={item.cartItemId} item={item} />;
        })}
      </Box>
      {cardItems.length == 0 && (
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
                {
                  isUzbek? "Hozircha savatchangizda mahsulotlar mavjud emas" : "Пока в вашей корзине нет товаров"
                }
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      <Footer sum={sum} />
    </Box>
  );
}

export default BasketPage;
