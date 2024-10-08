import React, { useEffect } from "react";
import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import MyContext from "../../components/Context/MyContext";
import { getOrdersByCustomerId } from "../../api/Order";
import {useNavigate} from 'react-router-dom'
import boxIcon from "../../assets/icons/empty.png";
import { formatNumberWithSpaces } from "../../components/Global/Functions";

function MyOrders() {
  const [orderList, setOrderList] = useState([]);
  const { user, isUzbek } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOrdersByCustomerId(user?.customerId);
      if (res?.success) {
        
        setOrderList(res.data);
      }
    };
    fetchData();
  }, []);

  const orderStatusTranslations = {
    uzbek: {
      NEW: 'Buyurtma berildi',
      PACK: 'Tayyorlandi',
      SEND: 'Yuborildi',
      REJECTED: 'Bekor qilindi',
      REACHED: 'Yetkazildi'
    },
    russian: {
      NEW: 'Заказ оформлен',
      PACK: 'Подготовлен',
      SEND: 'Отправлен',
      REJECTED: 'Отменён',
      REACHED: 'Доставлен'

    }
  };

  const getOrderStatusText = (statusType) => {
    const translations = isUzbek ? orderStatusTranslations.uzbek : orderStatusTranslations.russian;
    return translations[statusType] || 'Noma\'lum status'; // Default if status is not found
  };

  return (
    <Box sx={{ marginTop: 7, paddingTop: 2 }}>
      {orderList.map((order, idx) => {
        const date = new Date(order?.createdAt);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return (
        <Box key={order.orderId}>
            <Box sx={{paddingY: 2, backgroundColor: '#ffcdd2'}}>
                <Box display={"flex"} justifyContent={"space-around"} gap={2} >
                    <Typography fontSize={12}>
                        {formattedDate}
                    </Typography>
                    <Typography fontSize={12}>
                       Nr: {order.orderNumber}
                    </Typography>
                    <Typography fontSize={12}>
                       {formatNumberWithSpaces(order.orderCost)} {isUzbek? "so'm" : "сум"}
                    </Typography>
                </Box>

                <Grid container justifyContent={"center"}>
                    <Grid item xs = {7}>
                        <Button variant="contained" size="small" fullWidth sx={{backgroundColor: 'black', 
                        color: 'white',  marginTop: 1}}
                        onClick={() => navigate(`/order/${order.orderId}`)}
                    >
                            {
                              isUzbek? "Batafsil ma'lumot" : "Подробная информация"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container>
            <Grid item xs={4} sx={{paddingLeft: 2}}>
                <Box sx={{borderLeft: '1px solid grey', marginTop: 2, paddingLeft: 1}}>
                    <Typography fontSize={10} color={"grey"}>
                            {
                              isUzbek? "Status" : "Статус"
                            }
                    </Typography>
                    <Typography fontSize={12}>
                        { 
                          getOrderStatusText(order.orderStatusType)
                        }
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ height: "200px", paddingY: 1 }} className="main-box">
                <Box id="slider" className="look-slider">
                  {order?.orderDetailDtos?.map((item) => {
                    return (
                      <Box
                        className="scrollable-content"
                        key={item.productSizeVariant.barCode}
                        sx={{
                          borderRadius: "10px",
                          overflow: "hidden",
                          width: "30vw",
                        }}
                      >
                        {/* <Link to={`/products/${item.id}`}> */}
                          <img src={item.productImages[0]?.url} alt="" />
                        {/* </Link> */}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{marginY: 2}}/>
        </Box>
        );
      })}

      {orderList.length == 0 && (
        <Box marginTop={12}>
          <Grid
            container
            spacing={2}
            display={"flex"}
            textAlign={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={7}>
              <Box sx={{ width: "50%", margin: "auto" }}>
                <img src={boxIcon} alt="" />
              </Box>
              <Typography>
                {
                  isUzbek? "Hozircha sizda  buyurtmalar  mavjud emas" : "Пока у вас нет заказов"
                }
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

    </Box>
  );
}

export default MyOrders;
