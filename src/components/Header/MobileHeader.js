import React from "react";
import { Box, IconButton, Toolbar, Badge, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import logo from "../../assets/icons/Feliza-logo.png";
import { useContext } from "react";
import MyContext from "../Context/MyContext";

function MobileHeader({
  setIsDrawerOpen,
  setIsSearchOpen,
  navigateUserToFovoritePage,
  navigateUserToBasket,
}) {
  const { cardItems } = useContext(MyContext);
  return (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <CiBoxList style={{ color: "black" }} />
          </IconButton>

          <IconButton onClick={() => setIsSearchOpen(true)}>
            <CiSearch style={{ color: "black" }} />
          </IconButton>
        </Box>
        <Box>
          <Link to="/">
            <Box width={60}>
              <img src={logo} alt="" />
            </Box>
          </Link>
        </Box>
        <Box display={"flex"}>
          <IconButton onClick={() => navigateUserToFovoritePage()}>
            <CiHeart style={{ color: "black" }} />
          </IconButton>

          <Box sx={{ position: "relative" }}>
            <IconButton onClick={() => navigateUserToBasket()}>
              <PiShoppingCartThin style={{ color: "black" }} />
            </IconButton>

            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 10,
                backgroundColor: "black",
                width: "11px",
                height: "11px",
                display: cardItems.length == 0 ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <Typography sx={{ fontSize: 8, color: "white" }}>
                {cardItems.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default MobileHeader;
