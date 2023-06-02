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
import { flexBoxWithBG } from '../styles';
import CSS from 'csstype';

interface Props {}

const ChartPage: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { device, loading, indicator } = useMainContext();

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [dataDisplay, setDataDisplay] = useState<DataDisplay[]>([]);

    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
    };

    const indicatorData = ['pm10', 'pm2_5', 'pm1', 'pm4', 'co2', 'hum', 'lux', 'noise', 'pres', 'temp'];
    // get data for display
    const getData = async () => {
        const response = await doGraphQLFetch(apiUrl, getSensorDataInDate, {
            deviceName: device?.deviceName,
            date: data,
        });
        // console.log(`data in date ${data}`, response);
        // setSensorData(response.sensorDataInDate);
        let dataDisplays: DataDisplay[];
        if (indicator !== null) {
            dataDisplays = response.sensorDataInDate.map((sensor: SensorData) => {
                let value: DataDisplay;
                switch (indicator) {
                    case 'co2':
                        value = { time: sensor.time, value: sensor.co2 };
                        break;
                    case 'hum':
                        value = { time: sensor.time, value: sensor.hum };
                        break;
                    case 'lux':
                        value = { time: sensor.time, value: sensor.lux };
                        break;
                    case 'noise':
                        value = { time: sensor.time, value: sensor.noise };
                        break;
                    case 'pm1':
                        value = { time: sensor.time, value: sensor.pm1 };
                        break;
                    case 'pm10':
                        value = { time: sensor.time, value: sensor.pm10 };
                        break;
                    case 'pm2_5':
                        value = { time: sensor.time, value: sensor.pm2_5 };
                        break;
                    case 'pm4':
                        value = { time: sensor.time, value: sensor.pm4 };
                        break;
                    case 'pres':
                        value = { time: sensor.time, value: sensor.pres };
                        break;
                    case 'temp':
                        value = { time: sensor.time, value: sensor.temp };
                        break;
                    default:
                        value = { time: sensor.time, value: sensor.alt };
                        break;
                }
                return value;
            });
        } else
            dataDisplays = response.sensorDataInDate.map((sensor: SensorData) => {
                return { time: sensor.time, value: sensor.alt };
            });

        // filter data in hours
        dataDisplays = dataDisplays
            .map((curr: DataDisplay) => {
                let time = new Date(curr.time);
                time.setSeconds(0);
                time.setMinutes(0);
                return { time: time, value: curr.value };
            })
            .reduce((acc: DataDisplay[], curr: DataDisplay) => {
                if (acc.length === 0) {
                    acc.push(curr);
                } else {
                    if (!acc.find((item) => item.time.getTime() === curr.time.getTime())) acc.push(curr);
                }
                return acc;
            }, []);

        setDataDisplay(dataDisplays);
    };

    useEffect(() => {
        getData();
    }, [loading]);

    return (
        <div style={flexBoxWithBG}>
            <div style={fullViewBG}>
                <Calendar showDetailsHandle={showDetailsHandle} />
                <PickerComponent data={indicatorData} />
                {dataDisplay.length > 0 ? <Chart data={dataDisplay} /> : <p>No data</p>}
            </div>
        </div>
    );
};

export default ChartPage;

const fullViewBG: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    height: '100vh',
};
