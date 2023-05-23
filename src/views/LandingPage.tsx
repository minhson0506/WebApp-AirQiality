import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../hooks/fetch';
import { getDevices } from '../hooks/queries';
import { Device } from '../interfaces/Device';
import { useMainContext } from '../contexts/MainContext';
import { useGeolocated } from 'react-geolocated';
import { colors, flexBox } from '../styles';
import CSS from 'csstype';

const LandingPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const [displayDevices, setDisplayDevices] = useState<boolean>(false);
    const [devices, setDevices] = useState<Device[]>([]);

    const { setDeviceName, setLocation } = useMainContext();

    const searchDevices = async () => {
        const data = await doGraphQLFetch(apiUrl, getDevices, {});
        setDevices(data.allDevices);
        setDisplayDevices(true);
    };

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    // set location
    useEffect(() => {
        if (coords) {
            setLocation(`${coords?.latitude},${coords?.longitude}`);
        }
    }, [coords, setLocation]);

    return (
        <div style={flexBox}>
            {!isGeolocationAvailable && <div>Your browser does not support Geolocation</div>}
            {!isGeolocationEnabled && <div>Geolocation is not enabled</div>}
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <img src={require('../pictures/icon.png')} alt="app icon" style={{ width: '35%' }} />
                <img src={require('../pictures/landing.png')} alt="landing page" style={{ width: '70%' }} />
                {displayDevices ? (
                    <div style={deviceBox}>
                        <p style={{ fontSize: '18px' }}>Select device</p>
                        {devices.map((device: Device) => {
                            return (
                                <button
                                    style={buttonStyle}
                                    onClick={() => {
                                        setDeviceName(device.deviceName);
                                    }}
                                    key={device.deviceId}>
                                    {device.deviceName}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <button style={buttonStyle} onClick={searchDevices}>
                        Search device
                    </button>
                )}
            </div>
        </div>
    );
};

export default LandingPage;

const buttonStyle: CSS.Properties = {
    margin: '10px',
    fontWeight: 'bold',
    background: colors.lightBlue,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '200px',
    height: '50px',
    fontSize: '16px',
    borderRadius: '10px',
};

const deviceBox: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    maxHeight: '20%',
    alignItems: 'center',
};
