import { Axis, Orient } from 'd3-axis-for-react';
import * as d3 from 'd3';
import { DataDisplay } from '../interfaces/DataDisplay';

interface Props {
    data: DataDisplay[];
}

const Chart: React.FC<Props> = (props: Props) => {
    const data = props.data.map((d: any) => {
        return {
            time: new Date(d.time),
            value: +d.value,
        };
    }) as DataDisplay[];

    // console.log('data', data);
    const width = 600;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
        .scaleUtc()
        .domain(d3.extent(data, (d) => d.time) as [Date, Date])
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear<number>()
        .domain([0, d3.max(data, (d) => d.value)] as [number, number])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3
        .line<DataDisplay>()
        .defined((d) => !isNaN(d.value))
        .x((d) => x(d.time))
        .y((d) => y(d.value));

    return (
        <div style={{ width: '100%', padding: 0, margin: 0, alignSelf: 'center' }}>
            <svg viewBox={`0 0 ${width} ${height}`}>
                <g transform={`translate(0,${height - margin.bottom})`} strokeWidth={2} style={{ fontSize: '16px' }}>
                    <Axis scale={x} orient={Orient.bottom} />
                </g>
                <g transform={`translate(${margin.left},0)`} strokeWidth={2}>
                    <Axis scale={y} orient={Orient.left} />
                </g>
                <path
                    fill="none"
                    stroke="steelblue"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d={line(data) as string}
                />
            </svg>
        </div>
    );
};

export default Chart;
