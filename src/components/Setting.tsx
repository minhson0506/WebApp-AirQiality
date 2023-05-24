import { RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import { useMainContext } from '../contexts/MainContext';
import { BoldTextStyle, colors, flexBoxWithBG } from '../styles';
import CSS from 'csstype';
import {useState} from 'react';
import {doGraphQLFetch} from '../hooks/fetch';
import {updateDevice} from '../hooks/queries';

const Setting = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const {
        pm10,
        setPm10,
        pm25,
        setPm25,
        pm1,
        setPm1,
        pm4,
        setPm4,
        lux,
        setLux,
        temp,
        setTemp,
        co2,
        setCo2,
        hum,
        setHum,
        pres,
        setPres,
        noise,
        setNoise,
        device,
        setDevice,
    } = useMainContext();

    const [deviceName, setDeviceName] = useState<string>(device? device.deviceName : "")


    const settingArray = [
        {
            id: 0,
            name: 'Pm10',
            value: pm10,
            setValue: setPm10,
            max: 100,
        },
        {
            id: 1,
            name: 'Pm2.5',
            value: pm25,
            setValue: setPm25,
            max: 100,
        },
        {
            id: 2,
            name: 'Pm1',
            value: pm1,
            setValue: setPm1,
            max: 100,
        },
        {
            id: 3,
            name: 'Pm4',
            value: pm4,
            setValue: setPm4,
            max: 100,
        },
        {
            id: 4,
            name: 'CO2',
            value: co2,
            setValue: setCo2,
            max: 10000,
        },
        {
            id: 5,
            name: 'Humidity',
            value: hum,
            setValue: setHum,
            max: 100,
        },
        {
            id: 6,
            name: 'Light',
            value: lux,
            setValue: setLux,
            max: 500,
        },
        {
            id: 7,
            name: 'Noise',
            value: noise,
            setValue: setNoise,
            max: 100,
        },
        {
            id: 8,
            name: 'Pressure',
            value: pres,
            setValue: setPres,
            max: 5000,
        },
        {
            id: 9,
            name: 'Temp',
            value: temp,
            setValue: setTemp,
            max: 100,
        },
    ];

    const changeName = async () => {
        const response = await doGraphQLFetch(apiUrl, updateDevice, {id: device?.id, deviceId: device?.deviceId, deviceName: deviceName})
        if (response) {
            alert("Changed name of device successful")
        }
        if (device)
            setDevice({id: device.id, deviceId: device?.deviceId, deviceName: deviceName})
    };

    return (
        <div style={flexBoxWithBG}>
            <div style={CardStyle}>
                <p style={BoldTextStyle}>Change device name</p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <input
                        value={deviceName}
                        onChange={e => {
                            setDeviceName(e.target.value)
                        }}
                        style={{
                            border: '0px',
                            background: colors.lightGray,
                            borderRadius: '4px',
                            width: '80%',
                            height: '50px',
                        }}></input>
                    <img
                        src={require('../pictures/checkbox.png')}
                        alt="check-box"
                        style={{ width: '50px', height: '50px' }}
                        onClick={changeName}></img>
                </div>
            </div>
            <div style={BigCardStyle}>
                {settingArray.map((item, index) => (
                    <div key={index} style={{ marginBottom: '30px' }}>
                        <div style={Row}>
                            <p style={BoldTextStyle}>{item.name}</p>
                            <p>
                                Min: {item.value[0]} - Max: {item.value[1]}{' '}
                            </p>
                        </div>
                        <RangeSlider
                            style={{ marginTop: '10px' }}
                            max={item.max}
                            value={item.value}
                            onChange={(value) => {
                                item.setValue(value);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Setting;

const CardStyle: CSS.Properties = {
    backgroundColor: 'white',
    borderRadius: '4px',
    margin: '10px 20px 10px 20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
};

const BigCardStyle: CSS.Properties = {
    backgroundColor: 'white',
    borderRadius: '4px',
    margin: '10px 20px 80px 20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
};

const Row: CSS.Properties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};
