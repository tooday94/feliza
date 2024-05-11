import { Box, Fab, Grid, IconButton, Typography } from "@mui/material";
import {
  AddShoppingCart,
  Close,
  Brightness1,
  DeleteOutline,
} from "@mui/icons-material";
import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import ColorCircle from "../ColorCircle";
import { deleteCartItem } from "../../../api/Basket";
import { CiTrash } from "react-icons/ci";

function BasketCard({ item }) {
  const { setRefreshCard } = useContext(MyContext);

  const deleteCartItemById = async () => {
    const res = await deleteCartItem(item.cartItemId);
    if (res.success) {
      setRefreshCard((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        overflow: "hidden",
        pr: 1,
        pb: 2,
        borderBottom: "1px solid grey",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link to={`/product/${item.productId}`}>
            <Box
              sx={{ height: { xs: "180px", md: "600px" }, overflow: "hidden" }}
            >
              <img src={item.productImages[0].url} alt="" />
            </Box>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginBottom={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {item.nameUZB}
              </Typography>

              <Typography>{item.sellPrice * item.quantity} so'm</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box display={"flex"} gap={1}>
                  <Typography color={"grey"}>Soni:</Typography>
                  <Typography>{item.quantity}</Typography>
                </Box>
                <Box display={"flex"} gap={1}>
                  <Typography color={"grey"}>O'lchami:</Typography>
                  <Typography>{item.productSizeVariant.size}</Typography>
                </Box>

                <Box display="flex">
                  <ColorCircle color={item.colorCode} />
                  <Typography sx={{ marginLeft: 2 }}>
                    {item.colorNameUZB}
                  </Typography>
                </Box>

                <Box display={"flex"} gap={1}>
                  <Typography color={"grey"}>Art.NR:</Typography>
                  <Typography>{item.productSizeVariant.barCode}</Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box>
                <IconButton onClick={deleteCartItemById}>
                  <CiTrash />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BasketCard;
