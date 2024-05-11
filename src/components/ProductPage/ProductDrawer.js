import React from 'react'
import {Box, Drawer, Typography} from '@mui/material'
import { useContext } from 'react'
import MyContext from '../Context/MyContext'

function ProductDrawer({setIsDrawerOpen, isDrawerOpen, item, addProductToBasket}) {
  const {setRefreshCard} = useContext(MyContext)

  const handleClick = (id) => {
    addProductToBasket(id)
    setRefreshCard(prev => prev + 1)
  }
  return (
    <Box>
        <Drawer
       anchor='bottom'
       open= {isDrawerOpen}
       onClose={()=> setIsDrawerOpen(false)}
       >
        <Box sx={{width: '100%', height: '40vh'}} >

          <Box align= 'center'>
            
          <Typography  variant='h5' marginTop={3}>
            O'lchamni tanlang
          </Typography>

          
          <Box marginTop={3} px={1}>
            {
              item.productSizeVariantList?.map(item => {
                const isActive = item.quantity > 0
                return (
                  <Box key={item.size}
                       py={1} 
                       sx={{borderBottom: '1px solid lightgray'}} 
                       display='flex' 
                       justifyContent='space-between'
                       onClick= {() => (isActive? handleClick(item.id) : null)}
                       >
                    <Typography color={isActive? 'primary.main': 'secondary'} sx={{ml: 1}}>
                     {item.size}
                    </Typography>
                    {
                      !isActive && <Box>
                            <Typography>
                              Sotuvda mavjud emas
                            </Typography>
                         </Box>
                    }
                  </Box>
                )
              })
            }
          </Box>
          
          </Box>
        </Box>
       </Drawer>
    </Box>
  )
}

export default ProductDrawer