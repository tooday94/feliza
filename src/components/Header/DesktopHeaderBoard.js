import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getSubCategoriesByParent } from "../../api/Category";
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import { useNavigate } from "react-router-dom";

function DesktopHeaderBoard({ navItem, setSelectedItem, setShowBord }) {
  const [list, setList] = useState([]);
  const { isUzbek } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSubCategoriesByParent(navItem.nameUZB);
      if (res.success) {
        setList(res.data);
      }
    };

    fetchData();
  }, [navItem]);

  const navigateUserToPage = (id) => {
    navigate(`/products/${id}`);
    setShowBord(false);
    setSelectedItem(0);
  };

  return (
    <Box sx={{ minHeight: "400px", padding: 2, borderTop: "1px solid grey" }}>
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={6}>
          <Box>
            <Grid container>
              {list.map((item) => {
                const isLong = list.length > 10;
                return (
                  <Grid
                    item
                    xs={isLong ? 6 : 12}
                    key={item.nameUZB + item.nameRUS}
                  >
                    <Box
                      marginTop={1}
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigateUserToPage(item.id)}
                    >
                      <Typography className="underlineHover">
                        {isUzbek ? item.nameUZB : item.nameRUS}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <Box className="look-box" sx={{ height: "30vw" }}>
            {navItem ? <img src={navItem.imgUrl} alt="" /> : <Box></Box>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DesktopHeaderBoard;
