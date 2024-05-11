import { Box, styled } from '@mui/material'
import React from 'react'

function ColorCircle({color}) {

    const StyledBox = styled(Box)({
        width: '20px',
        height: '20px',
        backgroundColor: color,
        borderRadius: '50%',
        border: '1px solid lightgray'
    })

  return (
    <StyledBox>

    </StyledBox>
  )
}

export default ColorCircle