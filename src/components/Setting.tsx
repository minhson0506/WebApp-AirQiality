import { RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import { useMainContext } from '../contexts/MainContext';

interface Props {}

const Setting: React.FC<Props> = () => {
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
        alt,
        setAlt,
        noise,
        setNoise,
    } = useMainContext();

    return (
        <div style={{ height: '100%' }}>
            <p>Pm10</p>
            <p>
                Min: {pm10[0]} - Max: {pm10[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={pm10}
                onChange={(value) => {
                    setPm10(value);
                }}
            />
            <p>Pm2.5</p>
            <p>
                Min: {pm25[0]} - Max: {pm25[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={pm25}
                onChange={(value) => {
                    setPm25(value);
                }}
            />
            <p>Pm1</p>
            <p>
                Min: {pm1[0]} - Max: {pm1[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={pm1}
                onChange={(value) => {
                    setPm1(value);
                }}
            />
            <p>Pm4</p>
            <p>
                Min: {pm4[0]} - Max: {pm4[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={pm4}
                onChange={(value) => {
                    setPm4(value);
                }}
            />
            <p>Light</p>
            <p>
                Min: {lux[0]} - Max: {lux[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={lux}
                onChange={(value) => {
                    setLux(value);
                }}
            />
            <p>Temperate</p>
            <p>
                Min: {temp[0]} - Max: {temp[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={temp}
                onChange={(value) => {
                    setTemp(value);
                }}
            />
            <p>CO2</p>
            <p>
                Min: {co2[0]} - Max: {co2[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={co2}
                onChange={(value) => {
                    setCo2(value);
                }}
            />
            <p>Humidity</p>
            <p>
                Min: {hum[0]} - Max: {hum[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={hum}
                onChange={(value) => {
                    setHum(value);
                }}
            />
            <p>Pressure</p>
            <p>
                Min: {pres[0]} - Max: {pres[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={pres}
                onChange={(value) => {
                    setPres(value);
                }}
            />
            <p>Alt</p>
            <p>
                Min: {alt[0]} - Max: {alt[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={alt}
                onChange={(value) => {
                    setAlt(value);
                }}
            />
            <p>Noise</p>
            <p>
                Min: {noise[0]} - Max: {noise[1]}{' '}
            </p>
            <RangeSlider
                style={{ marginTop: 16, background: 'yellow' }}
                value={noise}
                onChange={(value) => {
                    setNoise(value);
                }}
            />
        </div>
    );
};

export default Setting;
