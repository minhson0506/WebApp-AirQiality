import { useState } from 'react';
import { doGraphQLFetch } from '../hooks/fetch';
import { getDevices } from '../hooks/queries';
import { Device } from '../interfaces/Device';
import { useMainContext } from '../contexts/MainContext';

interface Props {}

const LandingPage: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const [displayDevices, setDisplayDevices] = useState<boolean>(false);
    const [devices, setDevices] = useState<Device[]>([]);

    const { setDeviceName } = useMainContext();

    const searchDevices = async () => {
        const data = await doGraphQLFetch(apiUrl, getDevices, {});
        setDevices(data.allDevices);
        setDisplayDevices(true);
    };

    return (
        <div style={{width: '20%', display: 'flex', flexDirection: 'column'}}>
            <img src={require('../pictures/landing.png')} alt="landing page" style={{ width: '100%' }} />
            {displayDevices ? (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1>Devices</h1>
                    {devices.map((device: Device) => {
                        return (
                            <button
                                onClick={() => {
                                    setDeviceName(device.deviceName);
                                }}>
                                {device.deviceName}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
            <button onClick={searchDevices}>Search device</button>
        </div>
    );
};

export default LandingPage;
