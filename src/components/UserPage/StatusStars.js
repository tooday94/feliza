import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import iconGold from "../../assets/icons/statusGold.png";
import iconSilver from "../../assets/icons/statusSilver.png";
import iconStart from "../../assets/icons/statusStart.png";
import iconBronza from "../../assets/icons/statusBronza.png";
import { getCustomerByID } from "../../api/Customer";
import MyContext from "../Context/MyContext";

function StatusStars() {
    const { user} = useContext(MyContext);
    
    const [list, setList] = useState([])
  
    const goldStars = [iconGold, iconGold, iconGold, iconGold, iconGold]
    const startStars = [iconStart]
    const bronzaStars = [iconBronza, iconBronza, iconBronza]
    const silverStars = [iconSilver, iconSilver, iconSilver, iconSilver, iconSilver]

    useEffect(() => {
        const fetchData = async () => {
          const res = await getCustomerByID(user.customerId);
          if (res?.success) {
            if(res.data?.status?.statusName == 'START') {
              setList(startStars)
            } 
            else  if(res.data?.status?.statusName == 'GOLD') {
              setList(goldStars) 
            }else  if(res.data?.status?.statusName == 'SILVER') {
              setList(silverStars)
            } else {
              setList(bronzaStars)
            }
          }
        };
    
        if (user) {
          fetchData();
        }
      }, [user]);
  return (
    <Box>
      <Grid container spacing={1} display={"flex"} justifyContent={"center"}>
        {list.map((item, idx) => {
          return (
            <Grid key={idx} item xs={2}>
              <img src={item} alt="" />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default StatusStars;
