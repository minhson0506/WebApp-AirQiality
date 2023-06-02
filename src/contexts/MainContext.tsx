import {createContext, useContext} from "react";
import {Device} from "../interfaces/Device";

export type ContextType = {
    device: Device | null;
    setDevice: React.Dispatch<React.SetStateAction<Device | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    indicator: string | null;
    setIndicator: React.Dispatch<React.SetStateAction<string | null>>;
    location: string | null;
    setLocation: React.Dispatch<React.SetStateAction<string | null>>;
    pm10: [number, number];
    setPm10: React.Dispatch<React.SetStateAction<[number, number]>>;
    pm25: [number, number];
    setPm25: React.Dispatch<React.SetStateAction<[number, number]>>;
    pm1: [number, number];
    setPm1: React.Dispatch<React.SetStateAction<[number, number]>>;
    pm4: [number, number];
    setPm4: React.Dispatch<React.SetStateAction<[number, number]>>;
    lux: [number, number];
    setLux: React.Dispatch<React.SetStateAction<[number, number]>>;
    temp: [number, number];
    setTemp: React.Dispatch<React.SetStateAction<[number, number]>>;
    co2: [number, number];
    setCo2: React.Dispatch<React.SetStateAction<[number, number]>>;
    hum: [number, number];
    setHum: React.Dispatch<React.SetStateAction<[number, number]>>;
    pres: [number, number];
    setPres: React.Dispatch<React.SetStateAction<[number, number]>>;
    alt: [number, number];
    setAlt: React.Dispatch<React.SetStateAction<[number, number]>>;
    noise: [number, number];
    setNoise: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export const MainContext = createContext<ContextType>({
    device: null,
    setDevice: () => {},
    loading: false,
    setLoading: () => {},
    indicator: null,
    setIndicator: () => {},
    location: null,
    setLocation: () => {},
    pm10: [0, 0],
    setPm10: () => {},
    pm25: [0, 0],
    setPm25: () => {},
    pm1: [0, 0],
    setPm1: () => {},
    pm4: [0, 0],
    setPm4: () => {},
    lux: [0, 0],
    setLux: () => {},
    temp: [0, 0],
    setTemp: () => {},
    co2: [0, 0],
    setCo2: () => {},
    hum: [0, 0],
    setHum: () => {},
    pres: [0, 0],
    setPres: () => {},
    alt: [0, 0],
    setAlt: () => {},
    noise: [0, 0],
    setNoise: () => {}
});

export const useMainContext = () => useContext(MainContext);