import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "../Context/MyContext";
import logo from "../../assets/icons/Feliza-logo.png";
import couponImg from '../../assets/images/coupon.png'
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
  }, [])
  return (
    <Box sx={{ marginTop: 9 }}>
      <Typography variant="h5" textAlign={"center"}>
        {isUzbek ? "Mening kuponlarim" : "Мои купоны"}
      </Typography>

      <Grid container spacing={1}>
        {coupons.map((item, idx) => {
          return (
            <Grid
              key={idx + "a" + item.id}
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
                  src={couponImg}
                  alt=""
                />

                <Typography
                  sx={{
                    
                    textAlign: "center",
                    color: 'white',
                    fontSize: '24px'
                  }}
                >
                  {item.coupon?.credit}{isUzbek? "so'm" : 'сум'}
                </Typography>

                <Box sx={{position: "absolute", right: 5, bottom: 5}}>
                <Typography
                  sx={{
                    
                    
                    color: 'white',
                    fontSize: '24px'
                  }}
                >
                  {item.coupon?.credit}{isUzbek? "so'm" : 'сум'}
                </Typography>
                    <Box display={"flex"}>
                    <Typography fontSize={'11px'} color={'white'}>
                        Amal qilish muddati: 
                    </Typography>
                    <Typography fontSize={'11px'} color={'white'}>
                        22.08.2024
                    </Typography>
                    </Box>
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
