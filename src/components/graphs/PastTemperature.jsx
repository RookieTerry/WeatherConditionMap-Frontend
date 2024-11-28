import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const PastTemperature = ({id}) => {
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

    const option = {
        title: {
            text: 'Past Temp (℃)'
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data: ['temperature']
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
                name: 'temperature',
                type: 'line',
                stack: 'total',
                areaStyle: {},
                data: chartData.temps
            }
        ]
    };

    return <ReactECharts option={option} />;
};

export default PastTemperature;
