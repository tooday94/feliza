import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import couponIcon from "../../assets/icons/coupon-icon.png";
import couponImg from "../../assets/images/coupon-image.png";
import MyContext from "../Context/MyContext";
import MediumIcon from "../Global/Icons/MediumIcon";

function CouponContainer({ list }) {
  const { isUzbek } = useContext(MyContext);
  console.log(list);
  
  return (
    <Box marginTop={2}>
      <Box display={"flex"} alignItems={"center"} marginBottom={1}>
        <MediumIcon icon={couponIcon} />
        <Typography sx={{ marginLeft: 1 }}>
          {isUzbek ? "Kuponlar" : "Купоны"}
        </Typography>
      </Box>
      <Box>
        {list?.map((item) => {
          return (
            <Box key={item.id} sx={{marginY: 1}}>
              <Grid container>
                <Grid xs={8}>
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "50px"},
                      backgroundImage: `url(${couponImg})`,
                      backgroundSize: "cover", // Ensures the image covers the entire box
                      backgroundPosition: "center", // Centers the image
                      backgroundRepeat: "no-repeat", // Prevents the image from repeating
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Box textAlign={'center'}>
                        <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} >
                            {
                                item?.coupon?.credit
                            }
                            {isUzbek? " so'm" : ' сум'}
                        </Typography>
                        {/* sx={{display :item.expireDate? 'flex' : 'none' }} */}
                        <Box  gap={1} sx={{color: 'white'}}>
                            <Typography fontSize={11} >
                              Amal qilish muddati:
                            </Typography>
                            <Typography fontSize={11}>
                              {item.expireDate}
                            </Typography>
                        </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CouponContainer;
