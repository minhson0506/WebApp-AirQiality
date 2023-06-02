export interface Weather {
    location: LocationData;
    current: Current;
}

export interface LocationData {
    name: string;
    region: string;
    lat: number;
    lon: number;
}

export interface Current {
    temp_c: number;
    condition: ConditionWeather;
    pressure_mb: number;
    humidity: number;
    air_quality: AirQuality
}

export interface ConditionWeather {
    text: string;
    icon: string;
    code: number;
}

export interface AirQuality {
    co: number;
    pm2_5: number;
    pm10: number
}