import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MyContext from "../../Context/MyContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useEffect } from "react";
import { formatNumberWithSpaces } from "../Functions";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

export default function ProductCard({ item, bigSize }) {
  const {
    likedList,
    changeLikedList,
    user,
    setIsLoginPageOpen,
    isUzbek,
    setLastAction,
  } = useContext(MyContext);
  const [isLiked, setIsLiked] = useState(false);

  const isSale = item.sale > 0;

  useEffect(() => {
    const index = getIndexById(item.id);
    if (index >= 0) {
      setIsLiked(true);
    }
  }, [likedList]);

  const getIndexById = (targetId) => {
    return likedList?.findIndex((obj) => obj?.product?.id == targetId);
  };

  const handelLikeList = () => {
    if (user == 0 || user == undefined) {
      setIsLoginPageOpen(true);
      setLastAction({ actionType: "like_product", product_id: item.id });
    } else {
      changeLikedList(item.id);
      setIsLiked(!isLiked);
    }
  };

  return (
    <Card sx={{ maxWidth: 445, border: 0 }}>
      <Link to={`/product/${item?.id}`}>
        <Box
          sx={{
            height: { xs: bigSize ? "500px" : "300px", md: "500px" },
            overflow: "hidden",
          }}
        >
          <img src={item.productImages[0]?.url} alt="" />
        </Box>
      </Link>
      <CardContent sx={{ minHeight: "40px" }}>
        <Box display="flex" justifyContent="space-between">
          <Link to={`/product/${item.id}`}>
            <Typography
              gutterBottom
              fontSize={14}
              component="div"
              sx={{ fontWeight: "1px" }}
            >
              {isUzbek ? item.nameUZB : item.nameRUS}
            </Typography>
          </Link>

          <Box sx={{ color: "primary.main" }} onClick={handelLikeList}>
            {isLiked ? (
              <IoMdHeart fontSize={25} />
            ) : (
              <IoIosHeartEmpty fontSize={25} />
            )}
          </Box>
        </Box>
        <Box display={"flex"} gap={1} alignItems={"center"}>
          {isSale && (
            <Typography fontSize={14} sx={{ color: "red" }}>
              {formatNumberWithSpaces(item.salePrice)}{" "}
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
            {formatNumberWithSpaces(item.sellPrice)} {isUzbek ? "so'm" : "сум"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
