import {createContext, useContext} from "react";

export type ContextType = {
    deviceName: string | null;
    setDeviceName: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    indicator: string | null;
    setIndicator: React.Dispatch<React.SetStateAction<string | null>>;
    location: string | null;
    setLocation: React.Dispatch<React.SetStateAction<string | null>>;
};

export const MainContext = createContext<ContextType>({
    deviceName: null,
    setDeviceName: () => {},
    loading: false,
    setLoading: () => {},
    indicator: null,
    setIndicator: () => {},
    location: null,
    setLocation: () => {}
});

export const useMainContext = () => useContext(MainContext);