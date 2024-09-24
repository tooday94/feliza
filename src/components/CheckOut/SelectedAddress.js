import React, { useContext } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MediumIcon from "../Global/Icons/MediumIcon";
import editIcon from "../../assets/icons/edit.png";
import MyContext from "../Context/MyContext";

function SelectedAddress({ adresseList, setAddressId, addressId }) {
  const address = adresseList.find((item) => item.id == addressId);
  const { isUzbek } = useContext(MyContext);
  return (
    <Box sx={{ marginTop: 2, width: "100%", borderBottom: "1px solid grey" }}>
      <Grid container spacing={1}>
        <Grid item xs={10} display={"flex"} justifyContent={"space-between"}>
          <Typography>
            {address
              ? isUzbek
                ? address?.region?.nameUZB
                : address?.region?.nameRUS
              : ""}
            ,{" "}
            {address
              ? isUzbek
                ? address?.subRegion?.nameUZB
                : address?.subRegion?.nameRUS
              : ""}
            , {address?.street? address?.street : address?.postFilial?.postFilialName}  {address?.houseNumber}
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
