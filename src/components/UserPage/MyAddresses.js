import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../Context/MyContext";
import { getAdressByCustomer } from "../../api/Adress";
import AddNewAddress from "./AddNewAddress";
import { Delete } from "@mui/icons-material";

function MyAddresses() {
  const { user, isUzbek } = useContext(MyContext);
  const [list, setList] = useState([]);
  const [hasNewAddress, setHasNewAddress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdressByCustomer(user.customerId);

      if (res?.success) {
        setList(res.data);
        console.log(res.data);
      }
    };
    fetchData();
  }, [hasNewAddress]);

  return (
    <Box marginTop={9}>
      <Typography textAlign={"center"} variant="h5">
        {isUzbek ? "Mening manzillarim" : "Мои адреса"}
      </Typography>

      <Grid container display={"flex"} justifyContent={"center"}>
        {list.map((item, idx) => {
          return (
            <Grid key={item.id} item xs={11} md={6} lg={4}>
              <Card sx={{ padding: 1, marginY: 1, display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                  <Typography>{item.region.name}</Typography>
                  <Typography>{item.subRegion.name}</Typography>
                  <Typography>{item.postFilial.postFilialName}</Typography>
                  <Box display={"flex"} gap={1}>
                  <Typography>{item.street}</Typography>
                  <Typography>{item.houseNumber}</Typography>

                  </Box>
                </Box>
                <Box>
                    <IconButton>
                       <Delete/>
                    </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={11} md={8} lg={6}>
          <Card sx={{ padding: 1 }}>
            <Typography>{ isUzbek? 'Yangi manzil qöshish' : 'Добавить новый адрес'}</Typography>
            <AddNewAddress setHasNewAddress={setHasNewAddress} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyAddresses;
