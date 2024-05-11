import React from "react";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import logo from "../../assets/icons/Feliza-logo.png";
import { useState } from "react";
import DesktopHeaderBoard from "./DesktopHeaderBoard";
import { desktopNavList } from "../../data/DesktopHeaderNavList";
import { useContext } from "react";
import MyContext from "../Context/MyContext";

function DesktopHeader({
  setIsSearchOpen,
  navigateUserToFovoritePage,
  navigateUserToBasket,
  navigateUser,
}) {
  const [showBord, setShowBord] = useState(false);
  const [navItem, setNavItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const { isUzbek } = useContext(MyContext);

  const handleFirstBoxHover = (value) => {
    setShowBord(true);
    setNavItem(value);
    setSelectedItem(value.id);
  };

  const handleFirstBoxLeave = () => {
    setShowBord(false);
    setSelectedItem(0);
  };

  const handleSecondBoxHover = () => {
    setShowBord(true);
    setSelectedItem(navItem.id);
  };

  const handleSecondBoxLeave = () => {
    setShowBord(false);
    setSelectedItem(0);
  };

  return (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: { lg: "60px" },
        }}
      >
        <Box>
          <Link to="/">
            <Box width={90}>
              <img src={logo} alt="" />
            </Box>
          </Link>
        </Box>

        <Box display={"flex"} sx={{ height: "100%" }}>
          {desktopNavList.map((item, idx) => {
            return (
              <Box
                key={item.nameRUS + item.nameUZB + idx}
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: idx == 0 ? 7 : 2,
                  paddingRight: idx == desktopNavList.length - 1 ? 7 : 2,
                  cursor: "pointer",
                  color: "black",
                  textDecoration:
                    selectedItem == item.id ? "underline" : "none",
                }}
                onMouseEnter={() => handleFirstBoxHover(item)}
                onMouseLeave={() => handleFirstBoxLeave()}
              >
                <Typography fontWeight={"1px"}>
                  {isUzbek ? item.nameUZB : item.nameRUS}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box>
          <IconButton onClick={navigateUser}>
            <CiUser style={{ color: "black" }} />
          </IconButton>
          <IconButton onClick={() => setIsSearchOpen(true)}>
            <CiSearch style={{ color: "black" }} />
          </IconButton>
          <IconButton onClick={() => navigateUserToFovoritePage()}>
            <CiHeart style={{ color: "black" }} />
          </IconButton>

          <IconButton onClick={() => navigateUserToBasket()}>
            <PiShoppingCartThin style={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>

      <Box
        sx={{ display: showBord ? "block" : "none" }}
        onMouseEnter={() => handleSecondBoxHover()}
        onMouseLeave={() => handleSecondBoxLeave()}
      >
        <DesktopHeaderBoard
          navItem={navItem}
          setShowBord={setShowBord}
          setSelectedItem={setSelectedItem}
        />
      </Box>
    </Box>
  );
}

export default DesktopHeader;
