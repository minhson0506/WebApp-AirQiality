const getDevices = `
    query allDevices {
        allDevices {
        deviceId
        deviceName
        }
    }
`;

const updateDevice = `
    mutation updateDevice($deviceId: String!, $deviceName: String!) {
        updateDevice(deviceId: $deviceId, deviceName: $deviceName) {
            deviceId
            deviceName
        }
    }
`;

const getAllSensorData = `
    query allData($deviceName: String!) {
        allSensorDatas(deviceName: $deviceName) {
        id
        device {
            deviceId
            deviceName
        }
        time
        pm10
        pm2_5
        pm1
        pm4
        lux
        temp
        hum
        pres
        alt
        co2
        noise
        }
    }
`;
const getLatestSensorData = `
    query lastestData($deviceName: String!) {
        latestSensorData(deviceName: $deviceName) {
        id
        device {
            deviceId
            deviceName
        }
        time
        pm10
        pm2_5
        pm1
        pm4
        lux
        temp
        hum
        pres
        alt
        co2
        noise
        }
    }
`;

const getSensorDataInDate = `
    query dataInDate($deviceName: String!, $date: String!) {
        sensorDataInDate(deviceName: $deviceName, date: $date) {
        id
        device {
            deviceId
            deviceName
        }
        time
        pm10
        pm2_5
        pm1
        pm4
        lux
        temp
        hum
        pres
        alt
        co2
        noise
        }
    }
`;

export { getDevices, getAllSensorData, getLatestSensorData, getSensorDataInDate, updateDevice };
