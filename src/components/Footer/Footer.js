import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyContext from "../Context/MyContext";

export default function Footer({ sum }) {
  const navigate = useNavigate();
  const { setOrderItems, cardItems } = useContext(MyContext);

  const navigateUser = () => {
    if (cardItems.length > 0) {
      const orderItemList = cardItems.map((item) => item.cartItemId);
      setOrderItems(orderItemList);
      navigate("/checkout");
    }
  };
  return (
    <Box>
      <React.Fragment>
        <AppBar
          position="fixed"
          className="footer"
          sx={{
            top: "auto",
            bottom: 0,
            borderTop: "1px solid rgba(49, 47, 47, 0.603)",
            backgroundColor: "white",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Box
              display="flex"
              sx={{ justifyContent: { xs: "space-between", md: "center" } }}
              flex={1}
              alignItems="center"
            >
              <Button
                disabled={sum <= 0}
                variant="contained"
                sx={{ backgroundColor: "primary.main" }}
                onClick={navigateUser}
                size="small"
              >
                Sotib olish
              </Button>

              <Typography sx={{ color: "black", ml: 2 }}>
                Jami: {sum} so'm
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </Box>
  );
}
