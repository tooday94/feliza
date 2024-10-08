import { Box, Fab, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import { Link } from "react-router-dom";
import ColorCircle from "../ColorCircle";
import { deleteCartItem, updateCartItem } from "../../../api/Basket";
import { CiTrash } from "react-icons/ci";
import { grey } from "@mui/material/colors";
import { formatNumberWithSpaces } from "../Functions";

function BasketCard({ item }) {
  const { setRefreshCard, user, isUzbek, setIsLoading } = useContext(MyContext);

  const isSale = item.sale > 0;

  const deleteCartItemById = async () => {
    setIsLoading(true)
    const res = await deleteCartItem(item.cartItemId);
    if (res?.success) {
      setRefreshCard((prev) => prev + 1);
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  };

  

  const increaseQuantityOfProduct = () => {
    setIsLoading(true)
    const fetchData = async () => {
      const newQuantity = item.quantity + 1;
      
      const newCartItem = {
        customerId: user.customerId,
        productSizeVariantId: item.productSizeVariant.id,
        quantity: newQuantity,
      };
      
      const res = await updateCartItem(item.cartItemId, newCartItem);
      if (res?.success) {
        setRefreshCard((prev) => prev + 1);
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    };

    fetchData();
  };

  const decreaseQuantityOfProduct = async () => {
    setIsLoading(true)
    const fetchData = async () => {
      const newQuantity = item.quantity - 1;
      console.log(newQuantity);
      const newCartItem = {
        customerId: user.customerId,
        productSizeVariantId: item.productSizeVariant.id,
        quantity: newQuantity,
      };
      console.log(newCartItem);
      const res = await updateCartItem(item.cartItemId, newCartItem);
      if (res.success) {
        setRefreshCard((prev) => prev + 1);
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    };

    fetchData();
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
              
              
              marginBottom={2}
              
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                {isUzbek ? item.nameUZB : item.nameRUS}
              </Typography>

              {/* <Typography>{item.sellPrice * item.quantity} so'm</Typography> */}
              <Box>
                {isSale && (
                  <Typography fontSize={14} sx={{ color: "red" }}>
                    {formatNumberWithSpaces(item.salePrice * item.quantity)}{" "}
                    {isUzbek ? "so'm" : "сум"}
                  </Typography>
                )}
                <Typography
                  fontSize={12}
                  sx={{
                    textDecoration: isSale ? "line-through" : "none",
                    color: isSale ? "grey" : "black",
                  }}
                >
                  {formatNumberWithSpaces(item.sellPrice * item.quantity)}{" "}
                  {isUzbek ? "so'm" : "сум"}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box display={"flex"} gap={1}>
                  <Typography color={"grey"}>
                    {
                      isUzbek? "Soni:" : "Количество:"
                    }
                  </Typography>
                  {/* <Typography>{item.quantity}</Typography> */}

                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ border: "1px solid grey" }}
                  >
                    <Typography
                      marginX={1}
                      sx={{ color: item?.quantity > 1 ? "black" : grey[400] }}
                      onClick={() => {
                        if (item?.quantity > 1) {
                          decreaseQuantityOfProduct();
                        }
                      }}
                    >
                      -
                    </Typography>
                    <Typography marginX={2}>{item.quantity}</Typography>
                    <Typography
                      marginX={1}
                      sx={{
                        color:
                          item?.quantity < item?.productSizeVariant?.quantity
                            ? "black"
                            : grey[400],
                      }}
                      onClick={() => {
                        if (
                          item?.quantity < item?.productSizeVariant?.quantity
                        ) {
                          increaseQuantityOfProduct();
                        }
                      }}
                    >
                      +
                    </Typography>
                  </Box>
                </Box>
                <Box display={"flex"} gap={1}>
                  <Typography color={"grey"}>
                    {
                      isUzbek? "O'lchami:" : "Размер:"
                    }
                  </Typography>
                  <Typography>{item.productSizeVariant.size}</Typography>
                </Box>

                <Box display="flex">
                  <ColorCircle color={item.colorCode} />
                  <Typography sx={{ marginLeft: 2 }}>
                    {
                      isUzbek ? item.colorNameUZB : item.colorNameRUS
                    }
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
