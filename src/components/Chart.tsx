import { SensorData } from '../interfaces/SensorData';
import { Axis, Orient } from 'd3-axis-for-react';
import * as d3 from 'd3';

interface Props {
    data: SensorData[];
    indicator: string;
}

interface Data {
    date: Date;
    value: number;
}
const Chart: React.FC<Props> = (props: Props) => {
    const data = (
        props.data.map((d: SensorData) => {
            return {
                date: new Date(d.time),
                value: +d.pm10,
            };
        }) as Data[]
    ).sort((a: Data, b: Data) => a.date.getTime() - b.date.getTime());

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
        .scaleUtc()
        .domain(d3.extent(data, (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear<number>()
        .domain([0, d3.max(data, (d) => d.value)] as [number, number])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3
        .line<Data>()
        .defined((d) => !isNaN(d.value))
        .x((d) => x(d.date))
        .y((d) => y(d.value));

    return (
        <div>
            <h1>{props.indicator}</h1>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <g transform={`translate(0,${height - margin.bottom})`}>
                    <Axis scale={x} orient={Orient.bottom} />
                </g>
                <g transform={`translate(${margin.left},0)`}>
                    <Axis scale={y} orient={Orient.left} />
                </g>
                <path
                    fill="none"
                    stroke="steelblue"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d={line(data) as string}
                />
            </svg>
        </div>
    );
};

export default Chart;
