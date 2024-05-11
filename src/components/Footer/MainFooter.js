import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import React from "react";
import youtubeIcon from "../../assets/icons/youtube.png";
import instagramIcon from "../../assets/icons/instagram.png";
import telegramIcon from "../../assets/icons/telegram.png";
import tiktokIcon from "../../assets/icons/tiktok.png";
import facebookIcon from "../../assets/icons/facebook.png";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { footerNavList } from "../../data/FooterNavList";
import { useState } from "react";
import { isValidPhoneNumber } from "../Global/Functions";
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";

function MainFooter() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { setLastAction, setIsLoginPageOpen } = useContext(MyContext);

  const navigateUser = () => {
    if (isValidPhoneNumber(value)) {
      const tempPhone = value;
      setLastAction({ actionType: "phone", phoneNumber: tempPhone });
      setIsLoginPageOpen(true);
      setValue("");
    }
  };

  const linkToMedia = (link) => {
    window.open(link, "_blank");
  };

  return (
    <Box marginTop={5} sx={{ boxShadow: "inset 0 0.5px 0 black" }}>
      <Box align={"center"} paddingTop={2}>
        <Typography fontWeight={2}>
          Qaynoq chegirmalar va yangi mahsulotlar haqida birinchilardan bo'lib
          habardor bo'ling
        </Typography>
      </Box>

      <Grid container display={"flex"} justifyContent={"center"} marginTop={2}>
        <Grid item xs={8} md={6} lg={4}>
          <Box marginBottom={2}>
            <TextField
              variant="standard"
              fullWidth
              label="Telefon raqamingiz..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
              id="footer-phone-input"
            />

            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={navigateUser}
            >
              Kirish
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box align={"center"} marginTop={3} paddingX={2}>
        {footerNavList.map((item, idx) => {
          return (
            <Box
              key={item.nameUZ + idx}
              display="inline-block"
              sx={{ marginX: 1 }}
              onClick={() => navigate(item.link)}
            >
              <Typography>{item.nameUZ}</Typography>
            </Box>
          );
        })}
      </Box>

      <Box display={"flex"} justifyContent={"center"} gap={2} marginTop={2}>
        <Box
          sx={{ width: "30px", height: "30px" }}
          onClick={() =>
            linkToMedia("https://www.facebook.com/profile.php?id=100076425653712")
          }
        >
          <img src={facebookIcon} alt="" />
        </Box>
        <Box
          sx={{ width: "30px", height: "30px" }}
          onClick={() =>
            linkToMedia("https://www.instagram.com/feliza_uz/reels/")
          }
        >
          <img src={instagramIcon} alt="" />
        </Box>
        <Box
          sx={{ width: "30px", height: "30px" }}
        >
          <img src={tiktokIcon} alt="" />
        </Box>
        <Box
          sx={{ width: "30px", height: "30px" }}
          onClick={() =>
            linkToMedia("https://t.me/feliza_uz")
          }
        >
          <img src={telegramIcon} alt="" />
        </Box>
        <Box
          sx={{ width: "30px", height: "30px" }}
          onClick={() =>
            linkToMedia("https://www.youtube.com/@feliza_uz6743/featured")
          }
        >
          <img src={youtubeIcon} alt="" />
        </Box>
      </Box>

      <Box
        align={"center"}
        sx={{ color: "grey" }}
        marginTop={2}
        paddingBottom={1}
      >
        <Typography fontWeight={1} fontSize={12}>
          Mualliflik huquqi to'liq himoyalangan
        </Typography>
        <Typography fontWeight={1}>© 2024 Feliza</Typography>
      </Box>
    </Box>
  );
}

export default MainFooter;
