import React from 'react'
import {Box, Grid} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllCollections } from '../../api/LookCollections'
import {useNavigate} from 'react-router-dom'

function Looks() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllCollections();

            if(res.success) {
                console.log(res.data);
                setList(res.data);
            }
        }

        fetchData();
    }, [])

  return (
    <Box sx={{marginTop: '7vh'}}>
        <Grid container spacing={1}>
            {
                list.map((item, idx) => {
                    return(
                        <Grid item key={item.id} xs= {6} lg = {4}>
                            <Box 
                                className = 'look-box' 
                                sx={{height: {xs: '320px', md: '420px', lg: '700px', xl: '800px'}}}
                                onClick = {() => {navigate(`/look/${item.id}`)}}
                            >
                                <img src={item.images[0]?.url} alt="" />
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    </Box>
  )
}

export default Looks