import {createContext, useContext} from "react";

export type ContextType = {
    deviceName: string | null;
    setDeviceName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const MainContext = createContext<ContextType>({
    deviceName: null,
    setDeviceName: () => {}
});

export const useMainContext = () => useContext(MainContext);