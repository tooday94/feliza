import React, { useContext, useState, useEffect, useRef } from 'react'
import { Box, Button, Typography, Grid} from '@mui/material'
import ProductDetailes from './ProductDetailes';
import ProductColorCards from '../Global/Cards/ProductColorCards';
import ProductImagesDesktop from './ProductImagesDesktop';


function DesktopProductContainer({item, products, id, handelClick}) {

  const [isFixed, setIsFixed] = useState(false);
  const [largeBoxHeight, setLargeBoxHeight] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
          const largeBox = document.querySelector('.largeBox');
          let largeBoxHeight = largeBox.clientHeight;
          setLargeBoxHeight(largeBoxHeight);
          
    
          const smallBox = document.querySelector('.smallBox');
          const smallBoxHeight = smallBox.clientHeight;
          
          if(largeBoxHeight < smallBoxHeight) {
            largeBoxHeight = 4000
          }
          const shouldFix = window.scrollY > (largeBoxHeight - smallBoxHeight);
          setIsFixed(shouldFix);
          
        };
    
        handleScroll(); 
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [largeBoxHeight]);

      
    
      const fixedStyle = {
        top: '9vh', 
        width: '100%', 
        position: 'fixed'
      }
    
      const absoluteStyle = {
        bottom: 0, 
        width: '100%',
        position: 'absolute'
      }


  return (
    <Box className="largeBox" sx={{position: 'relative'}}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <ProductImagesDesktop list = {item?.productImages}/>
        </Grid>

        <Grid item xs={4}>
           {/* Product detallari uchun qoldirilgan bäsh joy */}
        </Grid>
      </Grid>

      <Box className= 'smallBox' sx={isFixed? absoluteStyle : fixedStyle}>
        <Grid container spacing={1}>
          <Grid item xs= {8}></Grid>
           <Grid item  xs= {4}>
            <Box>
              <Grid container display='flex' justifyContent='center'>        
                <Grid item xs= {11}>
                  <Box sx={{mt: 4}} >
        
                    <Box display='flex' justifyContent='space-between'>
                      <Typography>
                        {
                          item?.nameUZB
                        }
                      </Typography>
                      <Typography>
                        {
                          item?.sellPrice        
                        }
                        {" So'm"}
                      </Typography>
                    </Box>

                    <Box marginY={1} display='flex' justifyContent='space-between'>
                    <Box flex={1}>
                      <ProductColorCards products={products} id= {id}/>
                    </Box>

                    <Typography>
                      {item?.color?.nameUZB}
                    </Typography>
              
                    </Box>

                    <Button fullWidth variant='contained' sx={{mr: 2}} onClick={handelClick}>
                      Savatchaga
                    </Button>
                  </Box>
                  <Box  sx={{ mb: 2}}>
                    <ProductDetailes descriptionUZB = {item?.descriptionUZB} descriptionRUS = {item?.descriptionRUS}/> 
                  </Box>
                </Grid>
              </Grid>
            </Box>
           </Grid>
        </Grid>
      </Box>
      </Box>
  )
}

export default DesktopProductContainer