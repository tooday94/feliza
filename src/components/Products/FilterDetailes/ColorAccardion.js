import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getAllColors } from '../../../api/Colors';
import ColorCircle from '../../Global/ColorCircle';
import MyContext from '../../Context/MyContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ColorAccardion({colors, setColors}) {

  const [colorList, setColorList] = useState([]);
  const {isUzbek} = useContext(MyContext)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllColors();
      if(res?.success) {
        setColorList(res.data)
      }
    }

    fetchData();
  }, [])


  const handelClick = (id) => {
    if(colors.includes(id)) {
      setColors(colors.filter(item => item != id))
    } else {
      setColors(prev => [...prev, id])
    }
  }

  return (
    <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
         aria-controls="panel4-content"
        id="panel4-header"
        >
        Rang
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2} sx={{paddingX: 2}}>
        {
         colorList.map(item => {
          const isSelected = colors.includes(item.id);
            return(
            <Grid item xs={6} md = {4} key={item.colorCode}>
                <Box 
                  display={'flex'} 
                  alignItems={'center'} 
                  gap={2} 
                  sx={{cursor: 'pointer'}}
                  onClick = {() => handelClick(item.id)}
                >
                <ColorCircle key={item.colorCode} color={item.colorCode}/>
                <Typography style={{ textDecoration: isSelected?  'underline' : 'none' }}>
                    {
                        isUzbek? item.nameUZB : item.nameRUS
                    }
                </Typography>
                 </Box>
            </Grid>
            )
        })
        }
        </Grid>
        </AccordionDetails>
    </Accordion>
  )
}

export default ColorAccardion