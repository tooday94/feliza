import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function AddressList({ adresseList, setHasAdress, setAddressId }) {
  const [value, setValue] = useState(
    adresseList && adresseList.length > 0 ? adresseList[0].id : null
  );

  const handleChange = (event) => {
    setValue(event.target.value);
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
              adresseList.map((item, idx) => {
                const key = idx * item.id;
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
                      <Grid item xs={10}>
                        <Typography>
                          {idx + 1}. {item.region.name}, {item.subRegion.name},{" "}
                          {item.street}, {item.houseNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} display={"flex"} justifyContent={"end"}>
                        <FormControlLabel value={item.id} control={<Radio />} />
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ marginY: 1 }}
          onClick={() => setAddressId(value)}
        >
          Shu manzilga yuborish
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginY: 1 }}
          onClick={() => setHasAdress(false)}
        >
          Yangi manzil qöshish
        </Button>
      </Box>
    </Box>
  );
}

export default AddressList;
