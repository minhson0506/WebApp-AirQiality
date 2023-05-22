import React from 'react';
import './App.css';
import LandingPage from './views/LandingPage';
import { MainContext } from './contexts/MainContext';
import HomePage from './views/HomePage';

function App() {
    const [deviceName, setDeviceName] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [indicator, setIndicator] = React.useState<string | null>(null);
    return (
        <MainContext.Provider value={{ deviceName, setDeviceName, loading, setLoading, indicator, setIndicator }}>
            {deviceName == null ? <LandingPage /> : <HomePage />}
        </MainContext.Provider>
    );
}

export default App;
