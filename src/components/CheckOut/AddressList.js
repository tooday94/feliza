import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography, Button, Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MyContext from "../Context/MyContext";

function AddressList({ adresseList, setHasAdress, setAddressId }) {
  const [value, setValue] = useState(
    adresseList && adresseList.length > 0 ? adresseList[0].id : null
  );
  const { isUzbek } = useContext(MyContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBoxChange = (id) => {
    setValue(id);
  };

 

  return (
    <Box sx={{ marginTop: 2, width: "100%" }}>
      <Box>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {Array.isArray(adresseList) &&
              adresseList.map((address, idx) => {
                const key = idx * address.id;
                const isLast = adresseList.length - 1 == idx;
                return (
                  <Box
                    key={key}
                    sx={{
                      borderTop: "1px solid grey",
                      borderBottom: `${isLast ? "1px solid grey" : "none"}`,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Grid
                        item
                        xs={10}
                        onClick={() => handleBoxChange(address.id)}
                      >
                        
                        <Typography>
                          {idx + 1}.{" "}
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
                          ,{" "}
                          {address?.street
                            ? `${address?.street} ${address?.houseNumber || ""}`
                            : address?.postFilial
                            ? `${address?.postFilial?.postName}, ${
                                address?.postFilial?.postFilialName || ""
                              }`
                            : ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} display={"flex"} justifyContent={"end"}>
                        <FormControlLabel value={address.id} control={<Radio />} />
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ marginY: 1 }}
          onClick={() => setAddressId(value)}
        >
          {isUzbek ? "Manzilni tasdiqlash" : "Подтвердите адрес"}
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginY: 1 }}
          onClick={() => setHasAdress(false)}
        >
          {isUzbek ? "Yangi manzil qöshish" : "Добавить новый адрес"}
        </Button>
      </Box>
    </Box>
  );
}

export default AddressList;
