import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentWeather({ lat, lon, onViewPast }) {
    const [weatherDataList, setWeatherDataList] = useState([]);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    useEffect(() => {
        async function fetchPastData() {
            const requests = [];
            for (let id = 1; id <= 4; id++) {
                requests.push(
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pastPos/cntWea/${id}`)
                );
            }
            try {
                const responses = await Promise.all(requests);
                const data = responses.map(response => response.data);
                setWeatherDataList(data);
            } catch (error) {
                console.error("Error getting past data:", error);
            }
        }

        async function fetchCurrentData() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cntPos/cntWea`, {
                    lat: lat,
                    lon: lon
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setCurrentWeatherData(response.data);
            } catch (error) {
                console.error("Error getting current data:", error);
            }
        }

        fetchPastData();
        fetchCurrentData();
    }, [lat, lon]);

    const handleViewPast = (index) => {
        onViewPast(index);
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Weather</TableCell>
                            <TableCell>Temperature (℃)</TableCell>
                            <TableCell>Humidity (%)</TableCell>
                            <TableCell>Past Weather</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentWeatherData && (
                            <TableRow>
                                <TableCell>{currentWeatherData.location || "N/A"}</TableCell>
                                <TableCell>{currentWeatherData.time || "N/A"}</TableCell>
                                <TableCell>{currentWeatherData.weather || "N/A"}</TableCell>
                                <TableCell>{currentWeatherData.temperature?.toFixed(2) || "N/A"}</TableCell>
                                <TableCell>{currentWeatherData.humidity || "N/A"}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleViewPast(0)} fullWidth>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                        {weatherDataList.map((weatherData, index) => (
                            <TableRow key={index}>
                                <TableCell>{weatherData.location || "N/A"}</TableCell>
                                <TableCell>{weatherData.time || "N/A"}</TableCell>
                                <TableCell>{weatherData.weather || "N/A"}</TableCell>
                                <TableCell>{weatherData.temperature?.toFixed(2) || "N/A"}</TableCell>
                                <TableCell>{weatherData.humidity || "N/A"}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleViewPast(index + 1)} fullWidth>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
