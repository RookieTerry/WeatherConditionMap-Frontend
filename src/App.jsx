import {
  AppBar,
  Toolbar,
  Container,
  Paper,
  Stack,
  Typography,
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PositionSearchBar from "./components/bars/PositionSearchBar.jsx";
import Visualization from "./components/Visualization";
// map and api provider must be loaded in App.jsx
import { Map, APIProvider } from "@vis.gl/react-google-maps";
import "./App.css";
import MapComponent from "./components/graphs/Map.jsx";
import { useState, useRef, useEffect } from "react";
import AddressSearchBar from "./components/bars/AddressSearchBar.jsx";
import axios from "axios";
import CurrentWeather from "./components/tables/CurrentWeather.jsx";

function App() {
  // define the style for the items in the stack
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

  const [id, setId] = useState(0);
  const [cntLon, setCntLon] = useState("");
  const [cntLat, setCntLat] = useState("");
  const [address, setAddress] = useState("");
  const [locations, setLocations] = useState([
    // { location: { lat: 53.3443478, lng: -6.2821507 } },
  ]);

  useEffect(() => {
    // show all the stored positions on the map
    const fetchAllPastPos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pastPos/getAll`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllPastPos();
  }, []);

  const viewPastRef = useRef(null);

  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          // console.log("Geocoded location:", location.lat(), location.lng());
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };
  const handlePositionSearch = (lat, lng) => {
    setCntLat(lat);
    setCntLon(lng);
    setLocations((prevLocations) => [
      ...prevLocations,
      { location: { lat: parseFloat(lat), lng: parseFloat(lng) } },
    ]);
    // console.log("Grandparent component received latitude:", lat);
    // console.log("Grandparent component received longitude:", lng);
  };
  const handleAddressSearch = (address) => {
    setAddress(address);
    geocodeAddress(address)
      .then(({ lat, lng }) => {
        setCntLat(lat);
        setCntLon(lng);
        setLocations((prevLocations) => [
          ...prevLocations,
          { location: { lat: parseFloat(lat), lng: parseFloat(lng) } },
        ]);
        // console.log("Parent component received address:", address);
      })
      .catch((error) => {
        console.error("Error geocoding address:", error);
      });
  };

  const viewPast = (id) => {
    setId(id);
    if (viewPastRef.current) {
      viewPastRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Center vertically
          minHeight: "100vh", // Full viewport height
          boxSizing: "border-box",
          padding: 0,
          paddingTop: 2.5,
          paddingBottom: 32,
          // border: "1px solid red", // Red border
          width: "100vw",
          // overflow: "auto",
        }}
      >
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "center" }}>
            {/* <Typography variant="h6">+</Typography> */}
            <Typography variant="body1">Weather Condition Map</Typography>
          </Toolbar>
        </AppBar>
        {/* <Toolbar
          sx={{ width: 1, border: "1px solid red", justifyContent: "center" }}
        /> */}
        <Container
          sx={{
            margin: "0 auto",
            width: "100%",
            padding: "0 10%",
            marginTop: 4,
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} direction="column">
            <Item>
              <PositionSearchBar onPositionSearch={handlePositionSearch} />
            </Item>
            <Item>
              <AddressSearchBar onAddressSearch={handleAddressSearch} />
            </Item>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={2}
          >
            <Item sx={{ width: "100%" }}>
              <CurrentWeather lat={cntLat} lon={cntLon} onViewPast={viewPast} />
            </Item>
            <Item sx={{ height: "500px", width: "100%" }}>
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                <Map
                  defaultZoom={13}
                  // Lloyd Institute in TCD
                  defaultCenter={{
                    lat: 53.343844566929846,
                    lng: -6.251032911969971,
                  }}
                  mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/*pass position or address to it*/}
                  <MapComponent locations={locations} />
                </Map>
              </APIProvider>
            </Item>
          </Stack>
          <Visualization className="visualization" ref={viewPastRef} id={id} />
        </Container>
      </Box>
    </div>
  );
}

export default App;
