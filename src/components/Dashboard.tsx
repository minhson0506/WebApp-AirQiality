import { useEffect, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getLatestSensorData } from '../hooks/queries';
import { SensorData } from '../interfaces/SensorData';
import { Weather } from '../interfaces/Weather';

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName, location } = useMainContext();

    const [seconds, setSeconds] = useState(0);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);

    // get latest data
    const updateData = async () => {
        const data = await doGraphQLFetch(apiUrl, getLatestSensorData, { deviceName: deviceName });
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

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                style={{
                    width: '100%',
                    padding: '15px 20px 20px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <div style={{ paddingTop: '10px' }}>
                    {sensorData !== null ? (
                        <>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#000000' }}>
                                {new Date(sensorData.time).toISOString().split('T')[0]}
                            </h1>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#000000' }}>
                                {new Date(sensorData.time).toISOString().split('T')[1].split('Z')[0]}
                            </h1>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img
                            src={require('../pictures/location.png')}
                            alt="location"
                            style={{ width: '20px', height: '20px', paddingBottom: '5px' }}
                        />
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000', paddingLeft: '5px' }}>
                            {weather?.location?.name !== null && weather?.location?.name.toLowerCase() !== 'nulles'
                                ? weather?.location?.name
                                : 'No location'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img
                            src={`https:${weather?.current?.condition?.icon}`}
                            alt="temperature"
                            style={{ width: '20px', height: '20px', paddingBottom: '5px' }}
                        />
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000', paddingLeft: '5px' }}>
                            {weather?.current?.temp_c !== null ? weather?.current?.temp_c?.toFixed(1) + '°C' : ''}
                        </h1>
                    </div>
                </div>
            </div>

            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'solid 1px',
                }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/wind.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Pm10</p>
                        </div>
                        <p>{sensorData?.pm10}</p>
                        <p>µg/m3</p>
                    </div>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/wind.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Pm2.5</p>
                        </div>
                        <p>{sensorData?.pm2_5}</p>
                        <p>µg/m3</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/wind.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Pm1</p>
                        </div>
                        <p>{sensorData?.pm1}</p>
                        <p>µg/m3</p>
                    </div>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/wind.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Pm4</p>
                        </div>
                        <p>{sensorData?.pm4}</p>
                        <p>µg/m3</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/co2.png')} alt="wind" style={{ width: '20px' }} />
                            <p>CO2</p>
                        </div>
                        <p>{sensorData?.co2}</p>
                        <p>ppm</p>
                    </div>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/humidity.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Humidity</p>
                        </div>
                        <p>{sensorData?.hum}</p>
                        <p>RH</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/light.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Light</p>
                        </div>
                        <p>{sensorData?.lux}</p>
                        <p>lux</p>
                    </div>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/sound.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Noise</p>
                        </div>
                        <p>{sensorData?.noise}</p>
                        <p>dB</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 1px',
                        }}>
                        <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row' }}>
                            <img src={require('../pictures/temp.png')} alt="wind" style={{ width: '20px' }} />
                            <p>Temp</p>
                        </div>
                        <p>{sensorData?.temp}</p>
                        <p>lux</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
