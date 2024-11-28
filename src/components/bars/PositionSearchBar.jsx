import { useState } from "react";
import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import CheckPositionInput from "../CheckPositionInput.jsx";
import PropTypes from "prop-types";
// import SearchIcon from '@mui/icons-material/Search';

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

export default function PositionSearchBar({ onPositionSearch }) {
  // how to adjust: https://mui.com/material-ui/react-grid2/
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const handlePositionSearch = () => {
    if (latitude && longitude) {
      onPositionSearch(latitude, longitude);
      console.log("Parent component received latitude:", latitude);
      console.log("Parent component received longitude:", longitude);
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log("Latitude: " + position.coords.latitude);
            console.log("Longitude: " + position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            onPositionSearch(position.coords.latitude, position.coords.longitude);
          },
          function (error) {
            console.log("Error Code = " + error.code + " - " + error.message);
          }
      );
    } else {
      console.log("Geolocation API is not supported by this browser.");
    }
  }
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Item xs={6} md={3}>
          {/* <TextField label="Longitude" variant="outlined" fullWidth /> */}
          <CheckPositionInput
            id="longitude"
            label="Longitude"
            value={longitude}
            onValueChange={setLongitude}
          />
        </Item>
        <Item xs={6} md={3}>
          {/* <TextField label="Latitude" variant="outlined" fullWidth /> */}
          <CheckPositionInput
            id="latitude"
            label="Latitude"
            value={latitude}
            onValueChange={setLatitude}
          />
        </Item>
        <Item xs={12} md={1}>
          <Button
            id="positionSearch"
            variant="contained"
            onClick={handlePositionSearch}
            fullWidth
          >
            Search
          </Button>
        </Item>
        <Item xs={12} md={1}>
          <Tooltip title="Get your current location">
            <Button variant="contained" fullWidth onClick={getCurrentLocation}>
              Locate
            </Button>
          </Tooltip>
        </Item>
      </Grid>
    </div>
  );
}

PositionSearchBar.propTypes = {
  onPositionSearch: PropTypes.func.isRequired,
};
