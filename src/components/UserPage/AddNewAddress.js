import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import MyContext from "../Context/MyContext";
import { addAddress } from "../../api/Adress";
import MainDropdown from "../CheckOut/MainDropdown";
import SubRegionDropDown from "../CheckOut/SubRegionDropDown";
import PostFilialDropDown from "../CheckOut/PostFilialDropDown";

function AddNewAddress({setHasNewAddress}) {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [postFilial, setPostFilial] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  

  const { user } = useContext(MyContext);

  const addNewAdress = async () => {
    const adress = {
      customerId: user.customerId,
      regionId: region.id,
      subRegionId: district.id,
      street: street,
      houseNumber: houseNumber,
      postFilialId: postFilial.id,
    };
    const res = await addAddress(adress);

    if (res.success) {
      console.log('manzil qöshildi');
      setHouseNumber('')
      setRegion('');
      setDistrict('');
      setStreet('')
      setPostFilial('')
      setHasNewAddress(prev => prev + 1)
    } else {
        alert('Manzil qöshishda xatolik')
    }
  };


  return (
    <Box sx={{ marginTop: 2, width: "100%" }}>
      <Box
        display={"flex"}
        sx={{ border: "1px solid grey", borderRadius: "5px" }}
      >
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          sx={{ paddingLeft: 1 }}
        >
          <input
            style={{ backgroundColor: "inherit" }}
            type="text"
            placeholder="Viloyat"
            readOnly
            value={region ? region.name : ""}
          />
        </Box>
        <MainDropdown
          setRegion={setRegion}
          setDistrict={setDistrict}
          region={region}
          setPostFilial={setPostFilial}
        />
      </Box>
      <Box
        display={"flex"}
        sx={{ border: "1px solid grey", marginY: 2, borderRadius: "5px" }}
      >
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          sx={{ paddingLeft: 1 }}
        >
          <input
            style={{ backgroundColor: "inherit" }}
            type="text"
            placeholder="Tuman"
            readOnly
            value={district == "" ? "" : district.name}
          />
        </Box>
        <SubRegionDropDown
          setDistrict={setDistrict}
          region={region}
          setPostFilial={setPostFilial}
        />
      </Box>
      <Box
        display={region.name !== "Toshkent shaxri" ? "flex" : "none"}
        sx={{ border: "1px solid grey", marginY: 2, borderRadius: "5px" }}
      >
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          sx={{ paddingLeft: 1 }}
        >
          <input
            style={{ backgroundColor: "inherit" }}
            type="text"
            placeholder="Pochta filiali"
            readOnly
            value={
              postFilial == ""
                ? ""
                : postFilial.postName + " - " + postFilial.postFilialName
            }
          />
        </Box>
        <PostFilialDropDown district={district} setPostFilial={setPostFilial} />
      </Box>

      <Box display={region.name !== "Toshkent Shaxri" ? "none" : "block"}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box display={"flex"} sx={{ border: "1px solid grey" }}>
              <Box
                flex={1}
                display={"flex"}
                alignItems={"center"}
                sx={{ paddingLeft: 1 }}
              >
                <input
                  style={{ backgroundColor: "inherit" }}
                  type="text"
                  placeholder="Köcha nomi"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Box>
              <Button size="small" sx={{ color: "white", opacity: 0 }}>
                Street
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display={"flex"}
              sx={{ border: "1px solid grey", overflow: "hidden" }}
            >
              <Box
                flex={1}
                display={"flex"}
                alignItems={"center"}
                sx={{ paddingLeft: 1 }}
              >
                <input
                  style={{ backgroundColor: "inherit" }}
                  type="number"
                  placeholder="Uy raqami"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </Box>
              <Button size="small" sx={{ color: "white" }}>
                S
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" size="small" onClick={addNewAdress}>
          Manzilni saqlash
        </Button>
      </Box>
    </Box>
  );
}

export default AddNewAddress;
