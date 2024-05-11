import React from "react";
import { Box, Button, Drawer, Grid, Typography, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Global/Cards/ProductCard";
import { productList } from "../../data/DataList";
import { useState } from "react";
import { useEffect } from "react";
import {
  getFilteredProducts,
  getProductListByCategoryID,
} from "../../api/Product";
import TuneIcon from "@mui/icons-material/Tune";
import SortMenuButton from "../../components/Products/FilterDetailes/SortMenuButton";
import FilterDetailes from "../../components/Products/FilterDetailes/FilterDetailes";
import { getCategoryById } from "../../api/Category";
import { useLocation } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [minMaxPrice, setMinMaxPrice] = useState([]);
  const [list, setList] = useState([]);
  const [refreshed, setRefreshed] = useState(0);
  const { id } = useParams();
  const [opacity, setOpacity] = useState(1);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [sortType, setSortType] = useState(null);
  const location = useLocation();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductListByCategoryID(id, page);
      if (res?.success) {
        console.log(res.data);
        setProducts(res?.data.content);
        refreshFilter();
        window.scrollTo({  
          top: 0,
          behavior: "smooth" // Optional: adds smooth scrolling effect
        });
      }
    };

    // sortFilteredProducts();

    fetchData();
  }, [id, refreshed]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryById(id);
      if (res?.success) {
        setCategory(res?.data);
      }
    };
    fetchData();
  }, [id]);

  const refreshFilter = () => {
    setBrands([]);
    setColors([]);
    setSizes([]);
    setBrands([]);
    setList([]);
    setMinMaxPrice([]);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/products")) {
      function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY < prevScrollY || currentScrollY < 12) {
          // Scrolling down or scroll position is less than 12
          setOpacity(1);
        } else {
          setOpacity(0);
        }
        setPrevScrollY(currentScrollY);
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname, prevScrollY]);

  useEffect(() => {
    if(sortType !== null){
      sortFilteredProducts();
    }
  }, [sortType]);
  

  const sortFilteredProducts = async () => {
    console.log('filter');
    const filterRequset = {
      colorIds: colors,
      minPrice: minMaxPrice[0] ? minMaxPrice[0] : 1000,
      maxPrice: minMaxPrice[1] ? minMaxPrice[1] : 1000000,
      brandIds: brands,
      sizes: sizes,
      categoryId: id,
      categorySale: false,
      sortType: sortType,
    };
    const res = await getFilteredProducts(filterRequset, page);
    if (res?.success) {
      console.log(sortType);
      console.log(res.data);
      setProducts(res?.data?.content);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ pt: { xs: "120px", md: "140px" } }} id="product_page">
      <Box
        id="desctop-navbar"
        sx={{ top: { xs: "70px", sm: "85px", md: "90px" }, opacity: opacity }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: 1,
            backgroundColor: "white",
            paddingY: "5px",
            marginX: 2,
            borderRadius: "5px",
            border: "1px solid grey",
          }}
        >
          <SortMenuButton
            setSortType={setSortType}
            sortFilteredProducts={sortFilteredProducts}
          />

          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{}}>{category?.object?.nameUZB}</Typography>
          </Box>
          <Button
            startIcon={<TuneIcon />}
            variant="outlined"
            size="small"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </Button>
        </Box>
      </Box>

      <Grid container py={2} spacing={1}>
        {products?.map((item, idx) => {
          const bigSize = (idx + 1) % 5 == 0;
          return (
            <Grid item xs={bigSize ? 12 : 6} md={4} xl={3} key={item.id}>
              <ProductCard item={item} bigSize={bigSize} />
            </Grid>
          );
        })}
      </Grid>

      <Box display={"flex"} justifyContent={"center"}>
        
        <Pagination count={10} page={page} onChange={handleChange} />
      </Box>

      <Drawer
        anchor="right"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <Box sx={{ height: "100vh", width: "100vw" }}>
          <FilterDetailes
            setIsFilterOpen={setIsFilterOpen}
            setProducts={setProducts}
            categoryId={id}
            sizes={sizes}
            setSizes={setSizes}
            setBrands={setBrands}
            brands={brands}
            colors={colors}
            setColors={setColors}
            minMaxPrice={minMaxPrice}
            setMinMaxPrice={setMinMaxPrice}
            list={list}
            setList={setList}
            refreshFilter={setRefreshed}
            isSale={false}
            sortType={sortType}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Products;
