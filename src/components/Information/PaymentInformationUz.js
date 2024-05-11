import React from 'react'
import {Box, Typography} from '@mui/material'

function PaymentInformationUz() {
  return (
    <Box sx={{color: 'grey.600', marginX: 3}}>
        <Typography>
            Naqt pul yoki plastik karta orqali tölovlar mahsulot yetkazilgan vaqtda amalga oshiriladi (Uzcard, Humo, Mastercard, Visa)
        </Typography>

        <Typography sx={{marginY: 3}}>
            Online tölovlar quydagi tölov tizimlari orqali tölanadi (Payme, Click, Uzum Bank)
        </Typography>
    </Box>
  )
}

export default PaymentInformationUz