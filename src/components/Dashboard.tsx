import { useEffect, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getLatestSensorData } from '../hooks/queries';
import { SensorData } from '../interfaces/SensorData';

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName } = useMainContext();

    const [seconds, setSeconds] = useState(0);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);

    // get latest data
    const updateData = async () => {
        const data = await doGraphQLFetch(apiUrl, getLatestSensorData, { deviceName: deviceName });
        // console.log('data latest', data);
        setSensorData(data.latestSensorData[0]);
    };

    useEffect(() => {
        updateData();
    }, []);

    // update data every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 100) {
                setSeconds(0);
            } else {
                setSeconds(seconds + 1);
            }
            updateData();
        }, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{height: '100%'}}>
            <p> This is Dashboard Page </p>
        </div>
    );
};

export default Dashboard;
