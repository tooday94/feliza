import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Drawer, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Menu from "../../pages/Menu/Menu";
import logo from "../../assets/icons/Feliza-logo.png";
import SearchPage from "../../pages/SearchPage/SearchPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MyContext from "../Context/MyContext";
import Switch from "@mui/material/Switch";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

export default function HomePageHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    user,
    isLoginPageOpen,
    setIsLoginPageOpen,
    isUzbek,
    setIsUzbek,
    setLastAction,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const IconText = styled(Typography)({
    color: "black",
    fontWeight: "400",
    fontSize: "12px",
  });

  const navigateUser = () => {
    if (!user) {
      setIsLoginPageOpen(true);
    } else {
      navigate("/user_page");
    }
  };

  const navigateUserToBasket = () => {
    if (!user) {
      setIsLoginPageOpen(true);
      setLastAction({ actionType: "basket" });
    } else {
      navigate("/basket");
    }
  };

  const navigateUserToFovoritePage = () => {
    if (!user) {
      setIsLoginPageOpen(true);
      setLastAction({ actionType: "like" });
    } else {
      navigate("/favorite");
    }
  };

  useEffect(() => {
    const handlePopstate = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isSearchOpen]);
  return (
    <>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <MobileHeader
            setIsDrawerOpen={setIsDrawerOpen}
            setIsSearchOpen={setIsSearchOpen}
            navigateUserToFovoritePage={navigateUserToFovoritePage}
            navigateUserToBasket={navigateUserToBasket}
          />
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <DesktopHeader
            navigateUser={navigateUser}
            setIsSearchOpen={setIsSearchOpen}
            navigateUserToFovoritePage={navigateUserToFovoritePage}
            navigateUserToBasket={navigateUserToBasket}
          />
        </AppBar>
      </Box>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: {
              xs: "80vw",
              lg: "20vw",
              display: "flex",
              justifyContent: "center",
            },
          }}
          role="presentation"
        >
          <Box sx={{ width: "100%", py: 2 }}>
            <Box
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              sx={{ borderBottom: "1px solid black", pb: 1 }}
            >
              <Button onClick={() => setIsDrawerOpen(false)}>
                <ArrowBackIosIcon sx={{ color: "black" }} />
              </Button>

              {/* <Switch  defaultChecked  onChange={() => setIsUzbek(prev => !prev)}/> */}
              <Box display={"flex"} gap={1} paddingRight={2}>
                <Typography
                  sx={{ textDecoration: isUzbek ? "underline" : "none" }}
                  onClick={() => setIsUzbek(true)}
                >
                  Uzb
                </Typography>
                <Typography>/</Typography>
                <Typography
                  sx={{ textDecoration: isUzbek ? "none" : "underline" }}
                  onClick={() => setIsUzbek(false)}
                >
                  Рус
                </Typography>
              </Box>
            </Box>
            <Menu setIsDrawerOpen={setIsDrawerOpen} />
          </Box>
        </Box>
      </Drawer>

      {/* Drawer for Searchpage */}

      <Drawer
        anchor="top"
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      >
        <Box
          sx={{ width: "100vw", minHeight: { xs: "100vh", md: "60vh" } }}
          role="presentation"
        >
          <SearchPage setIsSearchOpen={setIsSearchOpen} />
        </Box>
      </Drawer>

      {/* Drawer for UserPage */}

      <Drawer
        anchor="bottom"
        open={isLoginPageOpen}
        onClose={() => setIsLoginPageOpen(false)}
      >
        <Box sx={{ height: "60vh", width: "100vw" }}>
          <LoginPage />
        </Box>
      </Drawer>
    </>
  );
}
