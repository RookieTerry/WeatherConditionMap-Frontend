import {
  Button,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

// this file has been integrated into another one
export default function CntPosCntWea({ lat, lon, onViewPast }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cntPos/cntWea`, {
          lat: lat,
          lon: lon
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    getData();
  }, [lat, lon]);

  const location = weatherData ? weatherData.location : "N/A";
  const time = weatherData ? weatherData.time : "N/A";
  const weather = weatherData ? weatherData.weather : "N/A";
  const temperature = weatherData ? weatherData.temperature.toFixed(2) : "N/A";
  const humidity = weatherData ? weatherData.humidity : "N/A";
  return (
    <div>
      <TableRow>
        <TableCell>{location}</TableCell>
        <TableCell>{time}</TableCell>
        <TableCell>{weather}</TableCell>
        <TableCell>{temperature}</TableCell>
        <TableCell>{humidity}</TableCell>
        <TableCell>
          <Button variant="contained" onClick={onViewPast} fullWidth>
            View
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
}
