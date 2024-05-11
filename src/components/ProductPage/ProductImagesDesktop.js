import React from 'react'
import {Box, Grid} from '@mui/material'

function ProductImagesDesktop({list}) {
  return (
    <Box>
        <Grid container spacing={1}>
        {
          list?.map(item => {
            return (
              <Grid item xs = {6} key={item.url}>
                <Box sx={{height: {md: '70vh'}}}>
                  <img src={item.url} alt="" />
                </Box>
              </Grid>
            )
          })
        }
        </Grid>
    </Box>
  )
}

export default ProductImagesDesktop