import { Box, Typography, Accordion, Button, Divider } from "@mui/material";
import React, { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import filialIcon from "../../assets/icons/shops.png";
import contactIcon from "../../assets/icons/communicate.png";
import AccordionBtn from "../../components/MenuPage/Accordion";
import { clothCategoryList } from "../../data/CategoryList";
import phoneIcon from "../../assets/icons/phone.png";
import telegramIcon from "../../assets/icons/paper.png";
import MyContext from "../../components/Context/MyContext";
import lookIcon from "../../assets/icons/look.png";
import saleIcon from "../../assets/icons/coupon.png";
import locationIcon from "../../assets/icons/location.png";
import clockIcon from "../../assets/icons/clock.png";
import { useNavigate, Link } from "react-router-dom";
import SaleAccordion from "../../components/MenuPage/SaleAccordion";
import { filialList } from "../../data/FilialData";
import FilialInfo from "../../components/MenuPage/FilialInfo";

function Menu({ setIsDrawerOpen }) {
  const { isUzbek, setIsLoginPageOpen, user, setLastAction } =
    useContext(MyContext);
  const clothesCategory = clothCategoryList;
  const navigate = useNavigate();

  const handelNavigate = (link) => {
    navigate(link);
    setIsDrawerOpen(false);
  };

  const navigateToUserPage = () => {
    if (!user) {
      setIsDrawerOpen(false);
      setIsLoginPageOpen(true);
      setLastAction({ actionType: "user_page" });
    } else {
      setIsDrawerOpen(false);
      navigate("/user_page");
    }
  };

  return (
    <Box position={"relative"}>
      <Box sx={{ borderBottom: "1px solid black", py: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          marginLeft={2}
          sx={{ cursor: "pointer" }}
          onClick={() => handelNavigate("/looks")}
          marginBottom={1}
        >
          <Box sx={{ width: "25px", height: "25px" }}>
            <img src={lookIcon} alt="" />
          </Box>
          <Typography>Look</Typography>
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: "25px", height: "25px" }}>
                <img src={saleIcon} alt="" />
              </Box>
              <Typography>{"Sale"}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box paddingLeft={2} marginBottom={1}>
              <Link to={`/products/7`}>
                <Typography onClick={() => setIsDrawerOpen(false)}>
                  {isUzbek ? "Barcha mahsulotlar" : "Все товары"}
                </Typography>
              </Link>
            </Box>

            {clothesCategory.map((item, idx) => {
              return (
                <SaleAccordion
                  setIsDrawerOpen={setIsDrawerOpen}
                  item={item}
                  key={idx}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
        {clothesCategory.map((item, idx) => {
          return (
            <AccordionBtn
              setIsDrawerOpen={setIsDrawerOpen}
              item={item}
              key={idx}
            />
          );
        })}
      </Box>
      <Box py={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: "25px", height: "25px" }}>
                <img src={contactIcon} alt="" />
              </Box>
              <Typography>
                {isUzbek ? "Biz bilan bog'lanish" : "Контакты"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box marginLeft="30px" display="flex" gap={1} alignItems="center">
              <Box sx={{ width: "25px", height: "25px" }}>
                <img src={phoneIcon} alt="" />
              </Box>
              <a href="tel: +4917663149800">+998993020106 </a>
            </Box>
            <Box
              marginLeft="30px"
              display="flex"
              gap={1}
              marginTop={1}
              alignItems="center"
            >
              <Box sx={{ width: "25px", height: "25px" }}>
                <img src={telegramIcon} alt="" />
              </Box>
              <a
                href="https://t.me/felizauz_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram bot
              </a>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: "25px", height: "25px" }}>
                <img src={filialIcon} alt="" />
              </Box>
              <Typography>
                {isUzbek ? "Filiallarimiz" : "Наши магазины"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box marginLeft="30px">
              
              {
                filialList.map((item, idx) => {
                  return(
                    <Box key={item.addresseUZ}>
                      <FilialInfo item={item}/>
                      <Divider sx={{display: idx== filialList.length -1 ? 'none' : 'block', marginY: 1}}/>
                    </Box>
                  )
                })
              }
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ marginX: 2 }} marginTop={1} display="flex" gap={1}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            sx={{ backgroundColor: "black" }}
            onClick={navigateToUserPage}
          >
            Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Menu;
