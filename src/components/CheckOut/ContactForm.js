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
  const [customer, setCustomer] = useState("");
  const { user } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerByID(user.customerId);
      if (res?.success) {
        hasCustomer(res.data.object.fullName, res.data.object.phoneNumber);
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
        label="Ism va familiyangiz"
        fullWidth
        value={fullName ? fullName : ""}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        sx={{ marginTop: 2 }}
        variant="outlined"
        size="small"
        label="Telefon raqamingiz"
        fullWidth
        //defaultValue={user? user.name: ''}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </Box>
  );
};

export default ContactForm;
