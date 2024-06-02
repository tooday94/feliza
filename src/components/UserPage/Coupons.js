import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../Context/MyContext";
import logo from "../../assets/icons/Feliza-logo.png";
import { getCouponsCustomerByID } from "../../api/Customer";

function Coupons() {
  const { user, isUzbek } = useContext(MyContext);
  const [coupons, setCoupons] = useState([]);

  const list = [1, 4, 6, 3, 2];

  useEffect(() => {
    const fetchData = async() => {
        const res = await getCouponsCustomerByID(user.customerId)
        if(res?.success) {
            console.log(res.data);
            setCoupons(res.data)
        }
    }

    fetchData();
  })
  return (
    <Box sx={{ marginTop: 9 }}>
      <Typography variant="h5" textAlign={"center"}>
        {isUzbek ? "Mening kuponlarim" : "Мои купоны"}
      </Typography>

      <Grid container spacing={1}>
        {list.map((item, idx) => {
          return (
            <Grid
              key={idx + "a" + item}
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
              display={"flex"}
              justifyContent={"center"}
            >
              <Box
                className="img-box coupon-card"
                sx={{
                  width: { xs: "95%", md: "100%" },
                  height: "240px",
                  marginY: 2,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1527049979667-990f1d0d8e7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />

                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    textAlign: "center",
                    color: 'white',
                    fontSize: '24px'
                  }}
                >
                  {item}000 000 {isUzbek? "so'm" : 'сум'}
                </Typography>

                <Box sx={{position: "absolute", right: 5, bottom: 5, display: "flex"}}>
                    <Typography fontSize={'11px'} color={'white'}>
                        Amal qilish muddati: 
                    </Typography>
                    <Typography fontSize={'11px'} color={'white'}>
                        22.08.2024
                    </Typography>
                </Box>

                <Box
                  className="img-box"
                  sx={{ position: "absolute", width: "30%", top: 5, left: 5 }}
                >
                  <img src={logo} alt="" />
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Coupons;
