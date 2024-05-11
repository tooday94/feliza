import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getOrdersById } from "../../api/Order";
import { useState } from "react";
import { useEffect } from "react";
import OrderContactInfo from "../../components/Order/OrderContactInfo";
import StatusIcons from "../../components/Order/StatusIcons";

function Order() {
  const [order, setOrder] = useState("");
  const { id } = useParams();
  const [test, setTest] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOrdersById(id);
      if (res?.success) {
        console.log(res.data);
        setOrder(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ marginTop: 9, paddingX: 1 }}>
      <OrderContactInfo order={order}/>

      
        <Typography fontSize={12} textAlign={"center"} fontWeight={'bold'}>
          Buyurtma qilingan mahsulotlar
        </Typography>
        <Box sx={{marginX: 1, paddingX: 1, borderLeft: '1px solid grey', paddingBottom: 1}}>
        <Box display={"flex"} justifyContent={"space-between"} sx={{borderBottom: '1px solid #bdbdbd', marginTop: 4, paddingBottom: 1}}>
            <Typography fontSize={12}>
                Status
            </Typography>
            <Typography fontSize={12} sx={{color: 'brown'}}>
                {
                    order.orderStatusType == 'NEW' ? 'Buyurtma berildi' : (order.orderStatusType == 'Pack' ? 'Tayyorlandi' : 
                    (order.orderStatusType == 'SEND' ? 'Yuborildi' : 'Bekor qilindi'))
                }
            </Typography>
        </Box>

        <StatusIcons status = {order.orderStatusType}/>
         
         <Box  sx={{borderBottom: '1px solid #bdbdbd', paddingY: '5px'}}>
             <Typography fontSize={12}>
               Mahsulotlar
             </Typography>
         </Box>

         <Box>
            {
              order?.orderDetailDtos?.map((item, idx) => {
                return(
                  <Box key={item.productName + idx} sx={{borderBottom: idx == order.orderDetailDtos.length -1 ? 'none' : '1px solid #bdbdbd'}}>
                    <Grid container display={"flex"} justifyContent={'space-between'} marginTop={2}>
                      <Grid item xs= {4}>
                        <Box className = 'look-box'>
                          <img src={item?.productImages[0]?.url} alt="" />
                        </Box>
                      </Grid>
                      <Grid item xs={6} display={"flex"} gap={2} flexDirection={"column"}>
                        <Typography fontWeight={'bold'} fontSize={12}>
                          {
                            item?.productName
                          }
                        </Typography>

                        <Box>
                          <Typography fontSize={12} sx={{color: 'grey'}}>
                            Narxi:
                          </Typography>
                          <Typography fontSize={12}>
                            {
                              item?.productCost
                            } so'm
                          </Typography>
                        </Box>

                        <Box>
                        <Box display={"flex"} gap={1}>
                          <Typography fontSize={12} sx={{color: 'grey'}}>
                            O'lchami:
                          </Typography>
                          <Typography fontSize={12}>
                            {
                              item?.productSizeVariant?.size

                            } 
                          </Typography>
                        </Box>
                        <Box display={"flex"} gap={1}>
                          <Typography fontSize={12} sx={{color: 'grey'}}>
                            Soni:
                          </Typography>
                          <Typography fontSize={12}>
                            {
                              item?.quantity
                            } 
                          </Typography>
                        </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )
              })
            }
         </Box>
      </Box>
    </Box>
  );
}

export default Order;
