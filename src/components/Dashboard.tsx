import { useEffect, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getLatestSensorData } from '../hooks/queries';
import { SensorData } from '../interfaces/SensorData';
import { Weather } from '../interfaces/Weather';
import { BoldTextStyle, NormalTextStyle, colors, flexBoxWithBG } from '../styles';
import CSS from 'csstype';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { device, location } = useMainContext();

    const [seconds, setSeconds] = useState(0);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);
    const { pm10, pm25, pm1, pm4, lux, temp, co2, hum, pres, noise } = useMainContext();

    // get latest data
    const updateData = async () => {
        const data = await doGraphQLFetch(apiUrl, getLatestSensorData, { deviceName: device?.deviceName });
        // console.log('data latest', data);
        setSensorData(data.latestSensorData[0]);
    };

    // get weather data
    const getWeatherData = async () => {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=ed7111cc88ee4769858141158222207&q=${location}&aqi=yes&day=10`,
        );
        if (!response.ok) {
            console.log('error');
            return;
        }
        const json = await response.json();
        // console.log('weather', json);
        setWeather(json);
    };

    const showDetail = (details: string) => {
        toast.info(details);
        // show out door data also here
    };

    useEffect(() => {
        updateData();
        getWeatherData();
    }, []);

    // update data every 1 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 100) {
                setSeconds(0);
            } else {
                setSeconds(seconds + 1);
            }
            updateData();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const dashboardArray = [
        {
            id: 0,
            name: 'Pm10',
            image: require('../pictures/wind.png'),
            value: sensorData?.pm10,
            unit: 'µg/m3',
            description: 'Particle density of particulate Matter(PM) in size range 0.3µm to 10.0µm in µg/m3',
        },
        {
            id: 1,
            name: 'Pm2.5',
            image: require('../pictures/wind.png'),
            value: sensorData?.pm2_5,
            unit: 'µg/m3',
            description: 'Particle density of particulate Matter(PM) in size range 0.3µm to 2.5µm in µg/m3',
        },
        {
            id: 2,
            name: 'Pm1',
            image: require('../pictures/wind.png'),
            value: sensorData?.pm1,
            unit: 'µg/m3',
            description: 'Particle density of particulate Matter(PM) in size range 0.3µm to 1.0µm in µg/m3',
        },
        {
            id: 3,
            name: 'Pm4',
            image: require('../pictures/wind.png'),
            value: sensorData?.pm4,
            unit: 'µg/m3',
            description: 'Particle density of particulate Matter(PM) in size range 0.3µm to 4.0µm in µg/m3',
        },
        {
            id: 4,
            name: 'CO2',
            image: require('../pictures/co2.png'),
            value: sensorData?.co2,
            unit: 'ppm',
            description: 'Carbon dioxide in ppm',
        },
        {
            id: 5,
            name: 'Humidity',
            image: require('../pictures/humidity.png'),
            value: sensorData?.hum,
            unit: 'RH',
            description: 'Humidity in %RH',
        },
        {
            id: 6,
            name: 'Light',
            image: require('../pictures/light.png'),
            value: sensorData?.lux,
            unit: 'lux',
            description: 'Lighting in lux',
        },
        {
            id: 7,
            name: 'Noise',
            image: require('../pictures/sound.png'),
            value: sensorData?.noise,
            unit: 'dB',
            description: 'Loudness in dB',
        },
        {
            id: 8,
            name: 'Pressure',
            image: require('../pictures/pressure.png'),
            value: sensorData?.pres,
            unit: 'hPa',
            description: 'Pressure in hPa',
        },
        {
            id: 9,
            name: 'Temp',
            image: require('../pictures/temp.png'),
            value: sensorData?.temp,
            unit: '°C',
            description: 'Temperature in °C',
        },
    ];

    const minValues = [pm10[0], pm25[0], pm1[0], pm4[0], co2[0], hum[0], lux[0], pres[0], noise[0], temp[0]];
    const maxValues = [pm10[1], pm25[1], pm1[1], pm4[1], co2[1], hum[1], lux[1], pres[1], noise[0], temp[1]];

    return (
        <div style={flexBoxWithBG}>
            <div style={Row}>
                <p style={BoldTextStyle}>{device?.deviceName}</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <FontAwesomeIcon style={{ color: colors.darkRed }} icon={faMapMarkerAlt} />
                    <p style={BoldTextStyle}>
                        {weather?.location?.name !== null && weather?.location?.name.toLowerCase() !== 'nulles'
                            ? weather?.location?.name
                            : 'No location'}
                    </p>
                </div>
            </div>
            <div style={Row}>
                {sensorData !== null && (
                    <div style={Column}>
                        <p style={NormalTextStyle}>
                            {'Date: ' + new Date(sensorData.time).toISOString().split('T')[0]}
                        </p>
                        <p style={NormalTextStyle}>
                            {'Time: ' + new Date(sensorData.time).toISOString().split('T')[1].split('Z')[0]}
                        </p>
                    </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <img
                        src={`https:${weather?.current?.condition?.icon}`}
                        alt="temperature"
                        style={{ width: '30px', height: '30px' }}
                    />
                    <p style={BoldTextStyle}>
                        {weather?.current?.temp_c !== null ? weather?.current?.temp_c?.toFixed(0) + '°C' : ''}
                    </p>
                </div>
            </div>
            <div className="dashboard-grid">
                {dashboardArray.map((item, index) => {
                    const minValue = minValues[index];
                    const maxValue = maxValues[index];
                    const isValueOutOfRange = item.value && (item.value < minValue || item.value > maxValue);

                    const dynamicImageStyle = {
                        ...ImageStyle,
                        backgroundColor: isValueOutOfRange ? colors.darkRed : colors.darkGreen,
                    };

                    return (
                        <div className="grid-item" key={index}>
                            {item && (
                                <div style={ColumnGap} onClick={() => showDetail(item.description)}>
                                    <div style={RowGap}>
                                        <div style={dynamicImageStyle}>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <p style={BoldTextStyle}>{item.name}</p>
                                    </div>
                                    <div style={ColumnGap}>
                                        <p style={{ fontSize: '25px', fontWeight: 'bold', color: 'black' }}>
                                            {item.value}
                                        </p>
                                        <p>{item.unit}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;

const Column: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
};

const ColumnGap: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
};

const Row: CSS.Properties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '10px 20px 0 20px',
    alignItems: 'center',
};

const RowGap: CSS.Properties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'flex-end',
};

const ImageStyle: CSS.Properties = {
    width: '30px',
    height: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};
