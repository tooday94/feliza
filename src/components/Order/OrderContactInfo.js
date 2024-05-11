import React from 'react'
import {Box, Grid, Typography} from '@mui/material'

function OrderContactInfo({order}) {
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
              Yetkazish manzili:
            </Typography>
            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.receiverName}
            </Typography>
            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.address?.region?.name}
            </Typography>
            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.address?.subRegion?.name}
            </Typography>

            <Box display={"flex"} gap={1}>
              <Typography fontSize={12} sx={{ color: "#616161" }}>
                {order?.address?.street},
              </Typography>
              <Typography fontSize={12} sx={{ color: "#616161" }}>
                {order?.address?.houseNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={14} fontWeight={"bold"}>
              To'lov turi:
            </Typography>

            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.paymentMethod}
            </Typography>

            <Typography fontSize={14} fontWeight={"bold"} marginTop={2}>
              Yetkazish turi:
            </Typography>

            <Typography fontSize={12} sx={{ color: "#616161" }}>
              {order?.address?.region?.name == "Toshkent shaxri"
                ? "Kurier orqali"
                : "Pochta xizmati"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
  )
}

export default OrderContactInfo