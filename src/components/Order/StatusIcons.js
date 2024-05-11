import React from 'react'
import {Box} from '@mui/material'
import { PiBagSimpleThin } from "react-icons/pi";
import { PiPackageLight } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";

function StatusIcons({status}) {
  return (
    <Box display={'flex'} justifyContent={'center'} gap={4} fontSize={25} paddingTop={1}>
        <Box >
           <PiBagSimpleThin />  
        </Box>
        <Box >
           <PiPackageLight />  
        </Box>
        <Box >
           <LiaShippingFastSolid />  
        </Box>
        <Box>
           <AiOutlineHome />  
        </Box>
        
    </Box>
  )
}

export default StatusIcons