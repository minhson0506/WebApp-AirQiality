import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import { doGraphQLFetch } from '../hooks/fetch';
import { getSensorDataInDate } from '../hooks/queries';
import { useMainContext } from '../contexts/MainContext';
import { format } from 'date-fns';
import { SensorData } from '../interfaces/SensorData';
import Chart from './Chart';
import { DataDisplay } from '../interfaces/DataDisplay';
import PickerComponent from './PickerComponent';

interface Props {}

const ChartPage: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName, loading, indicator } = useMainContext();

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [dataDisplay, setDataDisplay] = useState<DataDisplay[]>([]);

    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
    };

    const indicatorData = ['alt', 'co2', 'hum', 'lux', 'noise', 'pm1', 'pm10', 'pm2_5', 'pm4', 'pres', 'temp']
    // get data for display
    const getData = async () => {
        const response = await doGraphQLFetch(apiUrl, getSensorDataInDate, { deviceName: deviceName, date: data });
        // console.log(`data in date ${data}`, response);
        // setSensorData(response.sensorDataInDate);
        if (indicator !== null) {
            setDataDisplay(
                response.sensorDataInDate.map((sensor: SensorData) => {
                    return { time: sensor.time, value: sensor. } as DataDisplay;
                }),
            );
        }
    };

    useEffect(() => {
        getData();
    }, [loading]);

    return (
        <div style={{ height: '100%' }}>
            <p> This is Chart Page </p>
            <Calendar showDetailsHandle={showDetailsHandle} />
            {showDetails ? <p>{data}</p> : <></>}
            <PickerComponent data={indicatorData} />
            {dataDisplay.length > 0 ? <Chart data={dataDisplay} /> : <p>No data</p>}
        </div>
    );
};

export default ChartPage;
