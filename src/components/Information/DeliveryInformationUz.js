import React from 'react'
import {Box, Typography} from '@mui/material'

function DeliveryInformationUz() {
  return (
    <Box sx={{color: 'grey.600', marginX: 3}}>
        <Typography>
           Yetkazib berish xizmati 400 ming sömdan yuqori bölgan buyurtmalar uchun bepul
        </Typography>

        <Typography sx={{marginY: 3}}>
            Buyurtmalar Toshkent shaxri böylab 24 soat ichida yetkazib beriladi
        </Typography>

        <Typography >
            Buyurtmalar Özbekiston böylab 1-3 kun ichida yetkazib beriladi
        </Typography>

        <Typography sx={{marginY: 3}}>
        Eslatib o‘tamiz, 400 000 so‘mgacha bo‘lgan tovarlar uchun yetkazib berish xizmati 28 000 so‘m etib belgilangan.
        </Typography>
    </Box>
  )
}

export default DeliveryInformationUz