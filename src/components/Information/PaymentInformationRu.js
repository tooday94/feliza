import React from 'react'
import {Box, Typography} from '@mui/material'

function PaymentInformationRu() {
  return (
    <Box sx={{color: 'grey.600', marginX: 3}}>
       

        <Typography sx={{marginY: 3}}>
        Платежи осуществляются онлайн через следующие платежные системы: PayMe, Click, Uzum Bank.
        </Typography>
    </Box>
  )
}

export default PaymentInformationRu