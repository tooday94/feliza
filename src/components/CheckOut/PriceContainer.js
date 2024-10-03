import { Box, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import MyContext from "../Context/MyContext";

function PriceContainer({ quantity, priceWithoutCoupon, coupon, price }) {
  const { isUzbek } = useContext(MyContext);
  return (
    <Box>
      <Divider sx={{ marginY: 2 }} />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={1}>
          <Typography>{quantity}</Typography>
          <Typography variant="subtitle2">
            {isUzbek ? " ta mahsulot" : "товара:"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} gap={1}>
          <Typography variant="subtitle2">{priceWithoutCoupon}</Typography>
          <Typography variant="subtitle2">
            {isUzbek ? "so'm" : "сум"}
          </Typography>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="subtitle2">
          {isUzbek ? "Yetkazish narhi:" : "Стоимость доставки:"}
        </Typography>
        <Box sx={{ display: "flex" }} gap={1}>
          <Typography variant="subtitle2">0</Typography>
          <Typography variant="subtitle2">
            {isUzbek ? "so'm" : "сум"}
          </Typography>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="subtitle2">
          {isUzbek ? "Kupon:" : "Купон:"}
        </Typography>
        <Box sx={{ display: "flex" }} gap={1}>
          {coupon ? (
            <Typography variant="subtitle2">
              -{coupon?.coupon?.credit}
            </Typography>
          ) : (
            <Typography variant="subtitle2">0</Typography>
          )}
          <Typography variant="subtitle2">
            {isUzbek ? "so'm" : "сум"}
          </Typography>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="subtitle2">
          {isUzbek ? "To'lov miqdori:" : "Сумма платежа:"}
        </Typography>
        <Box sx={{ display: "flex" }} gap={1}>
          <Typography variant="subtitle2">{price}</Typography>
          <Typography variant="subtitle2">
            {isUzbek ? "so'm" : "сум"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PriceContainer;
