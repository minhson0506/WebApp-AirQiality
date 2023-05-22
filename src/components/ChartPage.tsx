import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import {doGraphQLFetch} from '../hooks/fetch';
import {getSensorDataInDate} from '../hooks/queries';
import {useMainContext} from '../contexts/MainContext';
import {format} from 'date-fns';
import {SensorData} from '../interfaces/SensorData';
import Chart from './Chart';

interface Props {}

const ChartPage: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName } = useMainContext();

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [loading, setLoading] = useState<boolean>(false);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    


    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
    };

    // get data for display
    const getData = async () => {
        const response = await doGraphQLFetch(apiUrl, getSensorDataInDate, { deviceName: deviceName, date: data });
        console.log(`data in date ${data}`, response);
        setSensorData(response.sensorDataInDate);
        setLoading(!loading);
    };

    useEffect(() => {
        getData();
    }, [loading]);

    return (
        <div style={{ height: '100%' }}>
            <p> This is Chart Page </p>
            <Calendar showDetailsHandle={showDetailsHandle} />
            {showDetails ? <p>{data}</p> : <></>}
            <Chart data={sensorData} indicator="pm25" />
        </div>
    );
};

export default ChartPage;
