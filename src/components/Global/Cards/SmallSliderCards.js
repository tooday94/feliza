import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatNumberWithSpaces, truncateText } from "../Functions";
import MyContext from "../../Context/MyContext";

export default function SmallSliderCards({ item }) {
  const {isUzbek} = useContext(MyContext)
  const isSale = item.sale > 0;

  return (
    <Card sx={{ maxWidth: 445, border: 0, minHeight: 320 }}>
      <Link to={`/product/${item.id}`}>
        <Box sx={{ height: { xs: "220px", md: "350px" }, overflow: "hidden" }}>
          <img src={item.productImages[0]?.url} alt="" />
        </Box>
      </Link>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Link to={`/product/${item.id}`}>
            <Typography gutterBottom fontSize={14} component="div">
              {isUzbek ? truncateText(item.nameUZB) : truncateText(item.nameRUS)}
            </Typography>
          </Link>
        </Box>

        <Box  alignItems={"center"}>
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
