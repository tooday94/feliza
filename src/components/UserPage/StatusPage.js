import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StatusInfo from "./StatusInfo";
import MyContext from "../Context/MyContext";
import { getCustomerByID } from "../../api/Customer";
import StatusStars from "./StatusStars";

function StatusPage() {
  const { user, isUzbek } = useContext(MyContext);
  const [customer, setCustomer] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerByID(user.customerId);
      if (res?.success) {
        setCustomer(res.data.object);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);
  



  return (
    <Box marginTop={9}>
      <Container>
        <Box>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            paddingY={3}
          >
            <Grid item xs={8} md={6} lg={4}>
              <StatusStars/>
              <Typography marginTop={1} variant="h5" textAlign={'center'}>
                {customer?.status?.statusName}
              </Typography>
              <Divider/>
            </Grid>
          </Grid>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography gutterBottom>
            {isUzbek ? "Hozirda sizning statusingiz:" : "Ваш текущий статус:"}
          </Typography>
          <Typography color="primary">
            {customer?.status?.statusName}
          </Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography gutterBottom>
            {isUzbek ? "Sizning ballaringiz:" : "Ваши баллы:"}
          </Typography>
          <Typography color="primary">
            {customer?.cashback ? customer?.cashback : 0}
          </Typography>
        </Box>
      </Container>
      <StatusInfo />
    </Box>
  );
}

export default StatusPage;
