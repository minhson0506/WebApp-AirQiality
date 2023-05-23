import React from 'react';
import './App.css';
import LandingPage from './views/LandingPage';
import { MainContext } from './contexts/MainContext';
import HomePage from './views/HomePage';

function App() {
    const [deviceName, setDeviceName] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [indicator, setIndicator] = React.useState<string | null>(null);
    const [location, setLocation] = React.useState<string | null>(null);
    const [pm10, setPm10] = React.useState<[number, number]>([0, 54]);
    const [pm25, setPm25] = React.useState<[number, number]>([0, 12]);
    const [pm1, setPm1] = React.useState<[number, number]>([0, 54]);
    const [pm4, setPm4] = React.useState<[number, number]>([0, 54]);
    const [co2, setCo2] = React.useState<[number, number]>([0, 5000]);
    const [hum, setHum] = React.useState<[number, number]>([0, 70]);
    const [lux, setLux] = React.useState<[number, number]>([0, 300]);
    const [noise, setNoise] = React.useState<[number, number]>([0, 35]);
    const [pres, setPres] = React.useState<[number, number]>([0, 1050]);
    const [alt, setAlt] = React.useState<[number, number]>([0, 1000]);
    const [temp, setTemp] = React.useState<[number, number]>([0, 30]);

    return (
        <MainContext.Provider
            value={{
                deviceName,
                setDeviceName,
                loading,
                setLoading,
                indicator,
                setIndicator,
                location,
                setLocation,
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
                alt,
                setAlt,
                noise,
                setNoise,
            }}>
            {deviceName == null ? <LandingPage /> : <HomePage />}
        </MainContext.Provider>
    );
}

export default App;
