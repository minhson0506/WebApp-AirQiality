import { useState } from 'react';
import {doGraphQLFetch} from '../hooks/fetch';
import {getDevices} from '../hooks/queries';
import {Device} from '../interfaces/Device';

interface Props {}

const LandingPage: React.FC<Props> = () => {
    // const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrl = 'https://airqualitybackend.onrender.com/graphql'
    const [displayDevices, setDisplayDevices] = useState<boolean>(false);
    const [devices, setDevices] = useState<Device[]>([]); // [id, deviceName, deviceId]

    const searchDevices = async() => {
        const data = await doGraphQLFetch(apiUrl, getDevices, {});
        setDevices(data.allDevices);
        setDisplayDevices(true);
    };

    return (
        <div className="App">
            <img src={require('../pictures/landing.png')} alt="landing page" style={{ width: '20%' }} />
            {displayDevices ? 
            <div>
                <h1>Devices</h1>
                {devices.map((device: Device) => {
                    return (
                        <div>
                            <h2>{device.deviceName}</h2>
                            <h3>{device.deviceId}</h3>
                        </div>
                    );
                })}
            </div> : <></>}
            <button
                onClick={searchDevices}>
                Search device
            </button>
        </div>
    );
};

export default LandingPage;
