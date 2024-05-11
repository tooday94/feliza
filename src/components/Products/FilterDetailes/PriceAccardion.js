import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Slider, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PriceAccardion({setMinMaxPrice}) {

    const [value, setValue] = useState([0, 3000000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handelClick = () => {
        document.getElementById('panel2-header').click();
        setMinMaxPrice(value)
    }
  return (
    
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
        >
            Narx
        </AccordionSummary>

        <AccordionDetails>
            <Box sx={{ width: 300, paddingX: 2 }}>
                <Slider
                  
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={3000000}
                />

                <Typography>
                    {value[0]} söm - {value[1]} söm
                </Typography>

                <Box display={'flex'} justifyContent={'end'}>
                    <Button variant='outlined' size='small' onClick={handelClick}>
                        Tanlash
                    </Button>
                </Box>
            </Box>
        </AccordionDetails>
    </Accordion>
    
  )
}

export default PriceAccardion