import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import MyContext from "../../components/Context/MyContext";
import { userNavList } from "../../data/UserPageList";
import { CiHeart } from "react-icons/ci";
import customerIcon from "../../assets/icons/customer.png";
import { useEffect } from "react";
import { useState } from "react";
import { getCustomerByID } from "../../api/Customer";
import StatusStars from "../../components/UserPage/StatusStars";

function UserPage() {
  const { user, setUser, isUzbek } = useContext(MyContext);
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    setUser(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCustomerByID(user.customerId);
      if (res?.success) {
        setCustomer(res.data.object);
        console.log(res.data);
      }
    };

    if (user) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box sx={{ width: "100%", marginTop: "9vh" }}>
      <Box sx={{ width: "100%", marginTop: 10 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
          {isUzbek ? "Meing profilim" : "Мой профиль"}
        </Typography>
        <Box sx={{ backgroundColor: "beige", paddingY: 3 }} align={"center"}>
          

          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            paddingY={3}
          >
            <Grid item xs={8} md={6} lg={4}>
              <StatusStars />
            </Grid>
          </Grid>
          <Box sx={{width: {xs: '80px'}, height: {xs: '80px'}, borderRadius: '50%', }}>
                <img src={customerIcon} alt="" />
              </Box>
          <Box marginTop={2}>
            <Typography>{customer?.fullName}</Typography>
          </Box>

          <Box>
            <Typography fontSize={12} color={"grey"}>
              {customer?.phoneNumber}
            </Typography>
          </Box>
        </Box>
        <Box paddingX={1} paddingY={2}>
          <Box>
            {userNavList.map((item) => {
              return (
                <Box
                  key={item.nameUZ}
                  marginBottom={1}
                  onClick={() => navigate(item.link)}
                  sx={{ cursor: "pointer" }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1}
                      sx={{ fontSize: "22px" }}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      {item.icon}
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>
                        {isUzbek ? item?.nameUZ : item?.nameRU}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
          <Button variant="contained" onClick={logOut} fullWidth>
            {isUzbek ? "Chiqish" : "Выйти"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserPage;
