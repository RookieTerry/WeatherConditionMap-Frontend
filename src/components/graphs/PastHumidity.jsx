import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const PastHumidity = ({id}) => {
    const [chartData, setChartData] = useState({ dates: [], humidities: [] });

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
                const humidities = data.map(item => item.humidity);

                setChartData({ dates, humidities });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const option = {
        title: {
            text: 'Past Humidity (%)'
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['humidity']
        // },
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
                name: 'humidity',
                type: 'line',
                stack: 'total',
                areaStyle: {},
                data: chartData.humidities
            }
        ]
    };

    return <ReactECharts option={option} />;
};

export default PastHumidity;
