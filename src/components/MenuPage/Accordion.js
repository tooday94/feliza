import React,{ useState, useEffect } from 'react'
import { Box, Typography, Accordion} from '@mui/material'
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { getSubCategoriesByParent } from '../../api/Category';
import { useContext } from 'react';
import MyContext from '../Context/MyContext';


function AccordionBtn({setIsDrawerOpen, item}) {
  const [list, setList] = useState([]);
  const {isUzbek} = useContext(MyContext)
  

  useEffect(() => {

    const fetchData = async() => {
      const res = await getSubCategoriesByParent(item.nameUZB);
      if(res.success) {
        setList(res.data);
      }
    }
    fetchData();
  }, [])


  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display='flex' alignItems='center' gap={1}>
            <Box sx={{width: '25px', height: '25px'}}>
              <img src={item.icon} alt="" />
            </Box>
            <Typography>{isUzbek? item.nameUZB : item.nameRUS}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{borderBottom: '1px solid lightgray', py: 1}}>
            <Link to={`/products/${item.id}`} >
              <Typography marginLeft='30px' onClick={() => setIsDrawerOpen(false)} my={1}>
                Barcha {item.nameUZB}
              </Typography>
            </Link>
          </Box>
        {
            list.map((i, idx) => {
              return(
                <Box key={i.id} sx={{borderBottom: '1px solid lightgray', py: 1}}>
                  <Link to={`/products/${i.id}`} >
                    <Typography marginLeft='30px' onClick={() => setIsDrawerOpen(false)} my={1}>
                     {isUzbek? i.nameUZB: i.nameRUS}
                    </Typography>
                  </Link>
                </Box>
              )
            })
          }
        </AccordionDetails>
      </Accordion>
  )
}

export default AccordionBtn