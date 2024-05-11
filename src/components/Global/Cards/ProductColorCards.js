import React from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function ProductColorCards({ products, id }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {products.map((item) => {
          return (
            <Grid item xs={2} md={2} key={item.id}>
              <Link to={`/product/${item?.id}`}>
                <Box
                  sx={{
                    height: { xs: "80px" },
                    overflow: "hidden",
                    border:
                      item?.id == id ? "1px solid black" : "1px solid white",
                  }}
                >
                  <img src={item.productImages[0]?.url} alt="" />
                </Box>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ProductColorCards;
