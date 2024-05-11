import React from 'react'
import {Button} from '@mui/material'

function UnderlineButton({text}) {
  return (
    <Button sx={{borderBottom: '1px solid white', borderRadius: 0, color: 'white'}}>
            {text}
    </Button>
  )
}

export default UnderlineButton