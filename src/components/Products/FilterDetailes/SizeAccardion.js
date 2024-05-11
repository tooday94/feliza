import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Grid, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SizeAccardion({sizes, setSizes}) {

    const list = ['XS', 'S', 'M','L', 'XL', '2XL', '3Xl', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34']

    const handelClick = (size) => {

        if(sizes.includes(size)) {
          setSizes(sizes.filter(item => item != size))
        } else {
          setSizes(prev => [...prev, size])
        }
    }
  return (
    <Accordion >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
        Ölcham
        </AccordionSummary>
        <AccordionDetails>
            <Grid container spacing={2} sx={{paddingX: 2}}>
                {
                    list.map((item, idx) => {
                        const isSelected = sizes.includes(item)
                        return(
                            <Grid item xs = {3} key={item}>
                                <Box key={idx + item} display={'flex'} alignItems={'center'} >
                                    <Checkbox
                                      checked = {isSelected}
                                      onChange={() => handelClick(item)}
                                    />
                                   <Typography>
                                    {item}
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

export default SizeAccardion