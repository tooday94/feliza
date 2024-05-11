import React from 'react'
import {Box, Typography} from '@mui/material'

function PaymentInformationRu() {
  return (
    <Box sx={{color: 'grey.600', marginX: 3}}>
        <Typography>
            Оплата наличными Пластиковой картой при получении заказа (Uzcard, Humo, Mastercard, Visa)
        </Typography>

        <Typography sx={{marginY: 3}}>
            Онлайн оплаты через платежные системы (Payme, Click, Uzum Bank)
        </Typography>
    </Box>
  )
}

export default PaymentInformationRu