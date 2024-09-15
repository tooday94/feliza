import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import paymentIcon from "../../assets/icons/payment.png";
import MediumIcon from "../Global/Icons/MediumIcon";
import MyContext from "../Context/MyContext";

function PaymentMethod({ setPayment, payment }) {
  const {isUzbek} = useContext(MyContext)
  const handleGenderChange = (event) => {
    setPayment(event.target.value);
  };
  return (
    <Box sx={{ marginTop: 2 }}>
      <FormControl>
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
        <Box display={"flex"} alignItems={"center"}>
          <MediumIcon icon={paymentIcon} />
          <Typography sx={{ marginLeft: 1 }}>
            {
              isUzbek? "To'lov turi" : "Тип оплаты"
            }
          </Typography>
        </Box>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={payment}
          onChange={handleGenderChange}
        >
          <FormControlLabel
            defaultChecked
            value="PAYME"
            control={<Radio />}
            label="Payme"
          />
          <FormControlLabel value="cash" control={<Radio />} label={isUzbek ? "Naqd pul" : "Наличные"} />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PaymentMethod;
