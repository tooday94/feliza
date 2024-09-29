import React, { useContext } from "react";
import { Box, TextField } from "@mui/material";
import MyContext from "../Context/MyContext";
import { useEffect } from "react";
import { useState } from "react";
import { getCustomerByID } from "../../api/Customer";

const ContactForm = ({
  setFullName,
  setPhoneNumber,
  fullName,
  phoneNumber,
}) => {
  const { user, isUzbek } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerByID(user.customerId);
      if (res?.success) {
        hasCustomer(res?.data?.fullName, res?.data?.phoneNumber);
        console.log(res.data);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const hasCustomer = (name, phone) => {
    setFullName(name);
    setPhoneNumber(phone);
  };

  return (
    <Box marginTop={2}>
      <TextField
        variant="outlined"
        size="small"
        label={isUzbek? "Ism va familiyangiz" : "Ваше имя и фамилия"}
        fullWidth
        value={fullName ? fullName : ""}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        sx={{ marginTop: 2 }}
        variant="outlined"
        size="small"
        label={isUzbek? "Telefon raqamingiz" : "Ваш номер телефона"}
        fullWidth
        //defaultValue={user? user.name: ''}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </Box>
  );
};

export default ContactForm;
