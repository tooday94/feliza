import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StatusInfo from "./StatusInfo";
import MyContext from "../Context/MyContext";
import { getCustomerByID } from "../../api/Customer";
import iconGold from "../../assets/icons/statusGold.png";
import iconSilver from "../../assets/icons/statusSilver.png";
import iconStart from "../../assets/icons/statusStart.png";
import iconBronza from "../../assets/icons/statusBronza.png";

function StatusPage() {
  const { user, isUzbek } = useContext(MyContext);
  const [customer, setCustomer] = useState("");
  const [list, setList] = useState([])

  const goldStars = [iconGold, iconGold, iconGold, iconGold, iconGold]
  const startStars = [iconStart]
  const bronzaStars = [iconBronza, iconBronza, iconBronza]
  const silverStars = [iconSilver, iconSilver, iconSilver, iconSilver, iconSilver]

  console.log(customer);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerByID(user.customerId);
      if (res?.success) {
        setCustomer(res.data.object);
        console.log(res.data);
        if(res.data?.object?.status?.statusName == 'START') {
          setList(startStars)
        } 
        else  if(res.data?.object?.status?.statusName == 'GOLD') {
          setList(goldStars) 
        }else  if(res.data?.object?.status?.statusName == 'SILVER') {
          setList(silverStars)
        } else {
          setList(bronzaStars)
        }
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
              <Box>
                <Grid
                  container
                  spacing={1}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {
                    list.map((item, idx) => {
                      return(
                        <Grid key={idx} item xs={2}>
                        <img src={item} alt="" />
                      </Grid>
                      )
                    })
                  }
                </Grid>
              </Box>
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
