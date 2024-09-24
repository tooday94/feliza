import React, { useContext } from 'react'
import {Box, Grid, Typography} from '@mui/material'
import MyContext from '../Context/MyContext'

function OrderContactInfo({order}) {
  const {isUzbek} = useContext(MyContext)
  return (
    <Box sx={{ paddingX: 2 }}>
        <Grid
          container
          sx={{
            paddingBottom: 3,
            borderBottom: "1px solid #616161",
            marginBottom: 2,
          }}
        >
         <Grid item xs={6}>
  <Typography fontSize={14} fontWeight={"bold"}>
    {isUzbek ? "Yetkazish manzili:" : "Адрес доставки:"}
  </Typography>

  {order?.address?.postFilial ? (
    <>
      {/* If postFilial exists */}
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.region?.nameUZB : order?.address?.region?.nameRUS}
      </Typography>
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.subRegion?.nameUZB : order?.address?.subRegion?.nameRUS}
      </Typography>
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.postFilial?.postName : order?.address?.postFilial?.postName}
      </Typography>
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.postFilial?.postFilialName : order?.address?.postFilial?.postFilialName}
      </Typography>
    </>
  ) : (
    <>
      {/* If postFilial does not exist */}
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.region?.nameUZB : order?.address?.region?.nameRUS}
      </Typography>
      <Typography fontSize={12} sx={{ color: "#616161" }}>
        {isUzbek ? order?.address?.subRegion?.nameUZB : order?.address?.subRegion?.nameRUS}
      </Typography>
      <Box display={"flex"} gap={1}>
        <Typography fontSize={12} sx={{ color: "#616161" }}>
          {order?.address?.street},
        </Typography>
        <Typography fontSize={12} sx={{ color: "#616161" }}>
          {order?.address?.houseNumber}
        </Typography>
      </Box>
    </>
  )}
</Grid>

          <Grid item xs={6}>
            <Typography fontSize={14} fontWeight={"bold"}>
              {
                isUzbek? "To'lov turi:" : "Тип оплаты"
              }
            </Typography>

            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.paymentMethod}
            </Typography>

            <Typography fontSize={14} fontWeight={"bold"} marginTop={2}>
             {
              isUzbek? "Yetkazish turi:" : "Тип доставки:"
             }
            </Typography>

            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {
                isUzbek? order?.address?.region?.name == "Toshkent shaxri"
                ? "Kurier orqali"
                : "Pochta xizmati": order?.address?.region?.name == "Toshkent shaxri"
                ? "Через курьера"
                : "Почтовая служба"
              }
            </Typography>
          </Grid>
        </Grid>
      </Box>
  )
}

export default OrderContactInfo