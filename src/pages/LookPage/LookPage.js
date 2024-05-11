import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCollectionByID } from '../../api/LookCollections';
import ProductCard from '../../components/Global/Cards/ProductCard';

function LookPage() {
    const {id} = useParams();
    const [lookProduct, setLookProduct] = useState('')


    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllCollectionByID(id);

            if(res.success) {
                console.log(res.data);
                setLookProduct(res.data);
            }
        }

        fetchData();
    }, [id])
  return (
    <Box sx={{marginTop: '8vh'}}>
        <Grid container display={'flex'} justifyContent={'center'}>
            <Grid item xs={11} md={8} lg={6}>
                <Box className='look-box' sx={{height: {xs: '70vh', md: '600px'}}}>
                    {lookProduct && lookProduct.images && lookProduct.images[0] && (
                        <img src={lookProduct.images[0].url} alt="Look Product" />
                    )}
                </Box>
            </Grid>
        </Grid>

        <Box marginTop={3}>
            
            {
                lookProduct && lookProduct.productResponseDtos && (
                    <Grid container spacing={1}>
                        {
                            lookProduct.productResponseDtos.map(item => {
                                return(
                                    <Grid item xs={6} key={item.nameUZB + item.id}>
                                        <ProductCard item={item} bigSize={false} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )
            }
            
        </Box>
    </Box>
  )
}

export default LookPage