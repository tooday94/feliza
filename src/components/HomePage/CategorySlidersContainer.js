import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductListByCategoryID } from "../../api/Product";
import SmallSlider from "../Sliders/SmallSlider";
import { ArrowRightAlt, RampRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCategoryById } from "../../api/Category";
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function CategorySlidersContainer({ categoryId }) {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { isUzbek } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductListByCategoryID(categoryId);
      if (res?.success) {
        if (res.data.content.length > 10) {
          setList(res.data.content.slice(4, 13));
        } else {
          setList(res.data.content);
        }
      }
    };

    fetchData();
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryById(categoryId);
      if (res.success) {
        console.log(res.data);
        setCategory(res.data);
      }
    };

    fetchData();
  }, [categoryId]);

  const handelNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Box
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          color: "black",
          marginX: 1,
          paddingX: 1,
        }}
        onClick={() => handelNavigate(categoryId)}
      >
        <Typography variant="h5">
          {category !== ""
            ? isUzbek
              ? category.object.nameUZB
              : category.object.nameRUS
            : ""}
        </Typography>

        <MdOutlineKeyboardDoubleArrowRight
          style={{ width: "25px", height: "25px" }}
        />
      </Box>
      <SmallSlider list={list} />
    </Box>
  );
}

export default CategorySlidersContainer;
