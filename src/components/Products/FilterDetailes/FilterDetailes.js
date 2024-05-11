import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FooterFilterDetailes from "./FooterFilterDetailes";
import ColorAccardion from "./ColorAccardion";
import SizeAccardion from "./SizeAccardion";
import PriceAccardion from "./PriceAccardion";
import BrendAccardion from "./BrendAccardion";
import { getFilteredProducts } from "../../../api/Product";

function FilterDetailes({
  setIsFilterOpen,
  setProducts,
  categoryId,
  colors,
  setColors,
  brands,
  setBrands,
  minMaxPrice,
  setMinMaxPrice,
  sizes,
  setSizes,
  list,
  setList,
  refreshFilter,
  isSale,
  sortType
}) {
  useEffect(() => {
    const filterRequset = {
      colorIds: colors,
      minPrice: minMaxPrice[0] ? minMaxPrice[0] : 1000,
      maxPrice: minMaxPrice[1] ? minMaxPrice[1] : 1000000,
      brandIds: brands,
      sizes: sizes,
      categoryId: +categoryId,
      categorySale: isSale,
      sortType: sortType
    };

    const fetchData = async () => {
      console.log(filterRequset);
      const res = await getFilteredProducts(filterRequset, 2);
      if (res?.success) {
        setList(res.data);
      }
    };

    if (
      sizes.length !== 0 ||
      brands.length !== 0 ||
      colors.length !== 0
    ) {
      fetchData();
    }
  }, [minMaxPrice, sizes, colors, brands]);

  return (
    <Box padding={2}>
      <Box display={"flex"} justifyContent={"start"} marginBottom={2}>
        <IconButton onClick={() => setIsFilterOpen(false)}>X</IconButton>
      </Box>

      <Divider sx={{ marginBottom: 1 }} />

      <SizeAccardion setSizes={setSizes} sizes={sizes} />

      <ColorAccardion setColors={setColors} colors={colors} />

      <PriceAccardion setMinMaxPrice={setMinMaxPrice} />

      <BrendAccardion setBrands={setBrands} brands={brands} />

      <FooterFilterDetailes
        list={list}
        setProducts={setProducts}
        setIsFilterOpen={setIsFilterOpen}
        refreshFilter={refreshFilter}
      />
    </Box>
  );
}

export default FilterDetailes;
