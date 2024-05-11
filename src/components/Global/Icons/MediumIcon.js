import React from 'react'
import {Box} from '@mui/material'


function MediumIcon({icon}) {
    
  return (
    <Box sx={{width: '30px', height: '30px'}}>
        <img src={icon} alt="" />
    </Box>
  )
}

export default MediumIcon