import { useEffect, useState } from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

export default function SimpleAreaChart({id}) {
    const [chartData, setChartData] = useState({ dates: [], temps: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/pastPos/pastWea/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }

                const dates = data.map(item => item.date);
                const temps = data.map(item => parseFloat(item.temp) - 273.15);

                setChartData({ dates, temps });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);
  return (
    <LineChart
      width={500}
      height={300}
      series={[{ data: chartData.temps, label: 'temperature', area: true, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: chartData.dates }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
      }}
    />
  );
}
