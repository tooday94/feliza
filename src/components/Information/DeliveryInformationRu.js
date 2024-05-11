import React from 'react'
import {Box, Typography} from '@mui/material'

function DeliveryInformationRu() {
  return (
    <Box sx={{color: 'grey.600', marginX: 3}}>
        <Typography>
           Бесплатная доставка при заказе от 400 000 сум
        </Typography>

        <Typography sx={{marginY: 3}}>
            Срок доставки по городу Ташкент до 24 часов
        </Typography>

        <Typography >
            Срок доставки по Узбекистану от 1 до 3 дней.
        </Typography>
    </Box>
  )
}

export default DeliveryInformationRu