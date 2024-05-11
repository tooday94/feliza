import React from 'react'
import { Box, Button, Grid, IconButton, Typography, styled } from '@mui/material'
import ProductSlider from '../Sliders/ProductSlider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { formatNumberWithSpaces } from '../Global/Functions';
import ProductColorCards from '../Global/Cards/ProductColorCards';
import ProductDetailes from './ProductDetailes';
import { useContext } from 'react';
import MyContext from '../Context/MyContext';


function MobileContainer({handelLikeList, item, isSale, 
          products, id, handelClick, isLiked }) {
    const {isUzbek} = useContext(MyContext)
    const SliderContainer = styled(Box)({
        width: '100%',
        height: '60vh',
        position: 'relative'
      })

    const FavoriteBox = styled(Box)({
        backgroundColor: 'rgba(255, 255, 255, 0.432)', 
         
        height: '35px', 
        width: '35px', 
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })  

  return (
    <Box>
        <SliderContainer > 

            <ProductSlider list = {item.productImages}/>

            <Box sx={{position: 'absolute', right: '10px', bottom: '10px'}}>
              <FavoriteBox sx={{color: 'primary.main',}} onClick = {handelLikeList}>
                {
                  isLiked? <FavoriteIcon/> :<FavoriteBorderIcon />
                }
              </FavoriteBox>
            </Box>
        </SliderContainer>

        <Box>
              <Grid container display='flex' justifyContent='center'>        
                <Grid item xs= {11}>
                  <Box sx={{mt: 4}} >
        
                    <Box display='flex' justifyContent='space-between'>
                      <Box>
                        <Typography>
                          {
                            item?.nameUZB
                          }
                        </Typography>
                        <Typography>
                          {
                            item?.color?.nameUZB
                          }
                        </Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={14}  sx={{ textDecoration: isSale? 'line-through' : 'none', color: isSale? 'grey' : 'black'}}>
                            {formatNumberWithSpaces(item.sellPrice)} {isUzbek? "so'm" :"сум"}
                        </Typography>
                        {
                          isSale && (
                            <Typography fontSize={17}  sx={{ color: 'red' }}>
                              {formatNumberWithSpaces(item.salePrice)} {isUzbek? "so'm" :"сум"}
                            </Typography>
                          )
                        }
                      </Box>
                    </Box>

                    <Box marginY={1} display='flex' justifyContent='space-between'>
                    <Box flex={1}>
                      <ProductColorCards products={products} id= {id}/>
                    </Box>
                    </Box>

                    <Button fullWidth variant='contained' sx={{mr: 2, backgroundColor: 'black'}} onClick={handelClick}>
                      Savatchaga
                    </Button>
                  </Box>
                  <Box  sx={{ mb: 2}}>
                    <ProductDetailes descriptionUZB = {item?.descriptionUZB} descriptionRUS = {item.product?.descriptionRUS}/> 
                  </Box>
                </Grid>
              </Grid>
          </Box>
    </Box>
  )
}

export default MobileContainer