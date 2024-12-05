import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const PastWindSpeed = ({id}) => {
    const [chartData, setChartData] = useState({ dates: [], windspeeds: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/.netlify/functions/PastPosRouter/pastPos/pastWea/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }

                const dates = data.map(item => item.date);
                const windSpeeds = data.map(item => item.windSpeed);

                setChartData({ dates, windSpeeds });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const option = {
        title: {
            text: 'Past Wind Speed (m/s)'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Wind Speed']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: chartData.dates
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'wind speed',
                type: 'line',
                stack: 'total',
                areaStyle: {},
                data: chartData.windSpeeds
            }
        ]
    };

    return <ReactECharts option={option} />;
};

export default PastWindSpeed;
