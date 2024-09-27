import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getOrdersById } from "../../api/Order";
import { useState } from "react";
import { useEffect } from "react";
import OrderContactInfo from "../../components/Order/OrderContactInfo";
import StatusIcons from "../../components/Order/StatusIcons";
import MyContext from "../../components/Context/MyContext";
import { formatNumberWithSpaces } from "../../components/Global/Functions";

function Order() {
  const [order, setOrder] = useState("");
  const { id } = useParams();
  const { isUzbek } = useContext(MyContext);

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
      <OrderContactInfo order={order} />

      <Typography fontSize={12} textAlign={"center"} fontWeight={"bold"}>
        {isUzbek ? "Buyurtma qilingan mahsulotlar" : "Заказанные товары"}
      </Typography>
      <Box
        sx={{
          marginX: 1,
          paddingX: 1,
          borderLeft: "1px solid grey",
          paddingBottom: 1,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: "1px solid #bdbdbd",
            marginTop: 4,
            paddingBottom: 1,
          }}
        >
          <Typography fontSize={12}>{isUzbek ? "Status" : "Статус"}</Typography>
          <Typography fontSize={12} sx={{ color: "brown" }}>
            {isUzbek
              ? order.orderStatusType == "NEW"
                ? "Buyurtma berildi"
                : order.orderStatusType == "PACK"
                ? "Tayyorlandi"
                : order.orderStatusType == "SEND"
                ? "Yuborildi"
                : order.orderStatusType == "REACHED"
                ? "Yetkazildi"
                : "Bekor qilindi"
              : order.orderStatusType == "NEW"
              ? "Заказ оформлен"
              : order.orderStatusType == "PACK"
              ? "Подготовлен"
              : order.orderStatusType == "SEND"
              ? "Отправлен"
              : order.orderStatusType == "REACHED"
              ? "Доставлен"
              : "Отменен"}
          </Typography>
        </Box>

        <StatusIcons status={order.orderStatusType} />

        <Box sx={{ padding: 2, backgroundColor: "black" }}>
          <Typography
            fontSize={12}
            sx={{ color: "white" }}
            textAlign={"center"}
          >
            {isUzbek
              ? order.orderStatusType == "NEW"
                ? "Buyurtma qabul qilindi va tez orada sizga yuborishga tayyorlanadi"
                : order.orderStatusType == "PACK"
                ? "Buyurtma tayyorlandi va tez orada sizga yuboriladi"
                : order.orderStatusType == "SEND"
                ? "Buyurtma siz tomoningizdan berilgan manzilga yuborildi."
                : order.orderStatusType == "REACHED"
                ? "Buyurtma yetkazildi. Bizni tanlaganingiz uchun tashakkur!"
                : "Afsusku buyurtma bekor qilindi, to'liq ma'lumot sizga sms orqali yuboriladi"
              : order.orderStatusType == "NEW"
              ? "Заказ принят, и вскоре будет готов к отправке"
              : order.orderStatusType == "PACK"
              ? "Заказ готов и вскоре будет отправлен вам"
              : order.orderStatusType == "SEND"
              ? "Заказ отправлен на указанный вами адрес"
              : order.orderStatusType == "REACHED"
              ? "Заказ доставлен. Спасибо за ваш выбор!"
              : "К сожалению, заказ был отменен, полная информация будет отправлена вам через SMS"}
          </Typography>

          <Box display={order?.orderStatusType == "SEND"? 'block' : 'none'}>
            <Typography color={'white'} textAlign={"center"} fontSize={12}>
              {
                isUzbek? "Pochta tomonidan berilgan raqam:" : "Номер, предоставленный почтой:"
              }
            </Typography>

            <Typography color={'yellow'} textAlign={"center"} fontSize={12}>
              {order?.postTrackingNumber }
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderBottom: "1px solid #bdbdbd", paddingY: "5px" }}>
          <Typography fontSize={12}>
            {isUzbek ? "Mahsulotlar" : "Товары"}
          </Typography>
        </Box>

        <Box>
          {order?.orderDetailDtos?.map((item, idx) => {
            return (
              <Box
                key={item.productName + idx}
                sx={{
                  borderBottom:
                    idx == order.orderDetailDtos.length - 1
                      ? "none"
                      : "1px solid #bdbdbd",
                }}
              >
                <Grid
                  container
                  display={"flex"}
                  justifyContent={"space-between"}
                  marginTop={2}
                >
                  <Grid item xs={4}>
                    <Box className="look-box">
                      <img src={item?.productImages[0]?.url} alt="" />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    display={"flex"}
                    gap={2}
                    flexDirection={"column"}
                  >
                    <Typography fontWeight={"bold"} fontSize={12}>
                      {item?.productName}
                    </Typography>

                    <Box>
                      <Typography fontSize={12} sx={{ color: "grey" }}>
                        {isUzbek ? "Narxi:" : "Цена:"}
                      </Typography>
                      <Typography fontSize={12}>
                        {formatNumberWithSpaces(item?.productCost)}{" "}
                        {isUzbek ? " so'm" : " сум"}
                      </Typography>
                    </Box>

                    <Box>
                      <Box display={"flex"} gap={1}>
                        <Typography fontSize={12} sx={{ color: "grey" }}>
                          {isUzbek ? "O'lchami:" : "Размер:"}
                        </Typography>
                        <Typography fontSize={12}>
                          {item?.productSizeVariant?.size}
                        </Typography>
                      </Box>
                      <Box display={"flex"} gap={1}>
                        <Typography fontSize={12} sx={{ color: "grey" }}>
                          {isUzbek ? "Soni:" : "Количество:"}
                        </Typography>
                        <Typography fontSize={12}>{item?.quantity}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Order;
