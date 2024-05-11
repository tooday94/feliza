import { Box, Fab, Grid, IconButton, Typography } from "@mui/material";
import { AddShoppingCart, DeleteOutline } from "@mui/icons-material";
import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { formatNumberWithSpaces } from "../Functions";
import { CiTrash } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";

function SmallCards({ item }) {
  const { changeLikedList, addToBasket, isUzbek } = useContext(MyContext);

  return (
    <Box
      sx={{
        height: { xs: "180px", md: "600px" },
        overflow: "hidden",
        pr: 2,
        my: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link to={`/product/${item?.id}`}>
            <Box
              sx={{ height: { xs: "180px", md: "600px" }, overflow: "hidden" }}
            >
              <img src={item?.productImages[0]?.url} alt="" />
            </Box>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: { xs: "180px", md: "600px" } }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography fontSize={12}>{item?.nameUZB}</Typography>
                <Typography color={grey[400]} fontSize={12}>
                  Ref:
                </Typography>
                <Typography fontSize={12}>{item?.referenceNumber}</Typography>
              </Box>

              <Box
                display={"flex"}
                gap={1}
                alignItems={"center"}
                flexDirection={"column"}
              >
                {item?.sale > 0 && (
                  <Typography fontSize={14} sx={{ color: "red" }}>
                    {formatNumberWithSpaces(item.salePrice)}{" "}
                    {isUzbek ? "so'm" : "сум"}
                  </Typography>
                )}
                <Typography
                  fontSize={item?.sale > 0 ? 12 : 14}
                  sx={{
                    textDecoration: item?.sale > 0 ? "line-through" : "none",
                    color: item?.sale > 0 ? "grey" : "black",
                  }}
                >
                  {formatNumberWithSpaces(item.sellPrice)}{" "}
                  {isUzbek ? "so'm" : "сум"}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box>
                <IconButton
                  onClick={() => {
                    addToBasket(item.id);
                    changeLikedList(item.id);
                  }}
                  sx={{ color: "black" }}
                >
                  <PiShoppingCartThin fontSize={25} />
                </IconButton>
                <IconButton
                  sx={{ marginRight: 1, color: "black" }}
                  onClick={() => changeLikedList(item.id)}
                >
                  <CiTrash fontSize={25} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SmallCards;
