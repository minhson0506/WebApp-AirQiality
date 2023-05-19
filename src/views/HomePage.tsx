import { useEffect, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getLatestSensorData } from '../hooks/queries';
import { SensorData } from '../interfaces/SensorData';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from '../components/Dashboard';
import Chart from '../components/Chart';
import Setting from '../components/Setting';

interface Props {}

const HomePage: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName } = useMainContext();

    const [seconds, setSeconds] = useState(0);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);

    // tab data
    const [state, setState] = useState({
        data: [
            { text: 'Home', icon: 'fa fa-home', key: 0, selected: true },
            { text: 'Chart', icon: 'fa fa-bar-chart', key: 1, selected: false },
            { text: 'Settings', icon: 'fa fa-cogs', key: 2, selected: false },
        ],
        current: 0,
    });

    // get latest data
    const updateData = async () => {
        const data = await doGraphQLFetch(apiUrl, getLatestSensorData, { deviceName: deviceName });
        console.log('data latest', data);
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
        <div>
            {state.current === 0 ? <Dashboard/> : state.current === 1 ? <Chart/> : <Setting/>}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0 auto',
                    width: '90%',
                    height: '100px',
                    marginTop: '16%',
                }}>
                {state.data.map((item) => {
                    return (
                        <div
                            key={item.key}
                            className="tab"
                            onClick={() => {
                                if (item.key === state.current) return;
                                let tabData = state.data;
                                tabData[item.key].selected = true;
                                tabData[state.current].selected = false;
                                setState({ data: tabData, current: item.key });
                            }}
                            style={{
                                backgroundColor: item.selected ? '#E7ECEA' : '#DDE2E0',
                                borderTop: item.selected ? 'solid 4px #57C185' : 'none',
                            }}>
                            <i
                                className={item.icon}
                                style={{
                                    color: item.selected ? '#57C185' : '#576574',
                                    fontSize: '2em',
                                    marginTop: '5%',
                                }}></i>
                        
                            <p
                                style={{
                                    color: item.selected ? '#57C185' : '#576574',
                                }}>
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
