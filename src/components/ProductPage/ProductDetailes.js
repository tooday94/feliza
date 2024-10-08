import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SmallSlider from "../Sliders/SmallSlider";
import MyContext from "../Context/MyContext";
import { getAllProduct } from "../../api/Product";
import paymentIcon from "../../assets/icons/pay.png";
import infoIcon from "../../assets/icons/info.png";
import deliveryIcon from "../../assets/icons/delivery.png";
import PaymentInformationUz from "../Information/PaymentInformationUz";
import PaymentInformationRu from "../Information/PaymentInformationRu";
import DeliveryInformationUz from "../Information/DeliveryInformationUz";
import DeliveryInformationRu from "../Information/DeliveryInformationRu";
import Deskription from "./Deskription";

function ProductDetailes({ descriptionUZB, descriptionRUS }) {
  const { isUzbek } = useContext(MyContext);

  return (
    <Box marginTop={3}>
      <Box sx={{ borderBottom: "1px solid lightgray" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: "35px", height: "35px" }}>
                <img src={infoIcon} alt="" />
              </Box>
              <Typography>
                {isUzbek ? "Mahsulot haqida to'liqroq" : "Описание товара"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography>
                        {isUzbek? descriptionUZB : descriptionRUS}
                    </Typography> */}

            <Deskription value={isUzbek ? descriptionUZB : descriptionRUS} />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ borderBottom: "1px solid lightgray" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: "35px", height: "35px" }}>
                <img src={paymentIcon} alt="" />
              </Box>
              <Typography>{isUzbek ? "To'lov turlari" : "Оплата"}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {isUzbek ? <PaymentInformationUz /> : <PaymentInformationRu />}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ borderBottom: "1px solid lightgray" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: "35px", height: "35px" }}>
                <img src={deliveryIcon} alt="" />
              </Box>
              <Typography>
                {isUzbek ? "Yetkazib berish" : "Доставка"}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {isUzbek ? <DeliveryInformationUz /> : <DeliveryInformationRu />}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* {
            likedList.length !=0 && <Box marginTop={3}>
                <Typography variant='h5' paddingY={1}>
                    Tanlangan mahsulotlar
                </Typography>
                <SmallSlider list= {likedProducts}/>
            </Box>
        } */}
    </Box>
  );
}

export default ProductDetailes;
