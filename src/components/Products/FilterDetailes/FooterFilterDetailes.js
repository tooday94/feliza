import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

function FooterFilterDetailes({list, setProducts, setIsFilterOpen, refreshFilter}) {
  
  const handelClick = () => {
    setProducts(list);
    setIsFilterOpen(false)
  }

  const handelCancelBtn = () => {
    refreshFilter(prev => prev + 1)
    setIsFilterOpen(false)
  }
  return (
    <Box >
      
      <AppBar position="fixed" className='footer'  sx={{ top: 'auto', bottom: 0, borderTop: '1px solid rgba(49, 47, 47, 0.603)', backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar >
          <Box display='flex' gap={2} sx={{justifyContent: {xs: 'space-between', md: 'center'}}} flex={1} alignItems='center'>
            <Button 
              variant='contained' 
              sx={{backgroundColor: 'primary.main'}}
              onClick={handelClick}
            >
                Ko'rish {list?.length}
            </Button>

            <Button variant='outlined' onClick={handelCancelBtn}>
                Bekor qilish
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    
    </Box>
  )
}

export default FooterFilterDetailes