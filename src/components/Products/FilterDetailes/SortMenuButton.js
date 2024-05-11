import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwapVertIcon from '@mui/icons-material/SwapVert';

function SortMenuButton({setSortType}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBtn = (value) => {
    setSortType(value);
    setAnchorEl(null);
    
  }

  return (
    <div>

       <Button 
          startIcon = {<SwapVertIcon/>}  
          variant='outlined' 
          size='small'
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Sort
       </Button>
        <Menu
           id="basic-menu"
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem onClick={()=> handleSortBtn('asc')}>Eng arzon narxlar</MenuItem>
        <MenuItem onClick={()=> handleSortBtn('desc')}>Eng baland narxlar</MenuItem>
        <MenuItem onClick={()=> handleSortBtn('createdAtAsc')}>Eng yangi mahsulotlar</MenuItem>
      </Menu>
      
    </div>
  );
}

export default SortMenuButton