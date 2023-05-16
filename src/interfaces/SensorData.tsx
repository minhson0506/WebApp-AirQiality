interface SensorData {
    time: Date;
    pm10: number;
    pm2_5: number;
    pm1: number;
    pm4: number;
    lux: number;
    temp: number;
    hum: number;
    pres: number;
    alt: number;
    co2: number;
    noise: number;
}

export type {SensorData}