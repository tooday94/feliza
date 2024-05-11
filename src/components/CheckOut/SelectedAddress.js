import React from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MediumIcon from "../Global/Icons/MediumIcon";
import editIcon from "../../assets/icons/edit.png";

function SelectedAddress({ adresseList, setAddressId, addressId }) {
  const address = adresseList.find((item) => item.id == addressId);
  return (
    <Box sx={{ marginTop: 2, width: "100%", borderBottom: "1px solid grey" }}>
      <Grid container spacing={1}>
        <Grid item xs={10} display={"flex"} justifyContent={"space-between"}>
          <Typography>
            {address?.region?.name}, {address?.subRegion?.name},{" "}
            {address?.street}, {address?.houseNumber}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => setAddressId("")}>
            <MediumIcon icon={editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectedAddress;
