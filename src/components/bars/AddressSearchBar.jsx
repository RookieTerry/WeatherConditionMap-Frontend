import React, { useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function AddressSearchBar({ onAddressSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddressSearch = () => {
    if (inputValue) {
      onAddressSearch(inputValue);
      console.log("Parent component received address:", inputValue);
    }
  };

  console.log("AddressSearchBar rendered");

  return (
    <div>
      <Grid
        container
        spacing={2}
        //adjust the below row
        justifyContent="center"
        alignItems="center"
        direction={{ xs: "column", sm: "column", md: "row" }}
      >
        <Item xs={12} sm={12} md={10}>
          <TextField
            id="address"
            label="Input Address"
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            fullWidth
          />
        </Item>
        <Item xs={12} md={2}>
          <Button
            id="addressSearch"
            variant="contained"
            onClick={handleAddressSearch}
            fullWidth
          >
            Search
          </Button>
        </Item>
      </Grid>
    </div>
  );
}

AddressSearchBar.propTypes = {
  onAddressSearch: PropTypes.func.isRequired,
};

export default React.memo(AddressSearchBar);
