import React, { useEffect, useState } from 'react'
import { getAllProduct, getProductListByCategoryID } from '../../api/Product';
import SmallSlider from '../Sliders/SmallSlider';
import { Typography } from '@mui/material';

function BestSellerBox() {
    const [list, setList] = useState([]);
    console.log('Bestseller');
    useEffect(() => {
        const fetchData = async() => {
          const res = await getProductListByCategoryID(9);
          if(res.success) {
            if(res.data.length > 10) {
                setList(res.data.slice(0, 10))
            }else {
                setList(res.data)
            }
            
          }
        }
    
        fetchData();
      }, [])
  return (
    <div>
        <Typography variant='h4' sx={{marginLeft: 2}}>
            #Bestseller
        </Typography>
        <SmallSlider list={list}/>
    </div>
  )
}

export default BestSellerBox