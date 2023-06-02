import { useMainContext } from '../contexts/MainContext';
import CSS from 'csstype';

interface Props {
    data: string[];
}

const PickerComponent: React.FC<Props> = (props: Props) => {
    const { setIndicator, loading, setLoading } = useMainContext();
    return (
        <select
            style={SelectStyle}
            onChange={(e) => {
                setIndicator(e.target.value);
                setLoading(!loading);
            }}>
            {props.data.map((item: string) => {
                return (
                    <option value={item} key={item}>
                        {item}
                    </option>
                );
            })}
        </select>
    );
};

export default PickerComponent;

const SelectStyle: CSS.Properties = {
    width: '50%',
    height: '40px',
    border: '1px solid #2D387A',
    borderRadius: '4px',
    fontSize: '18px',
    background: 'white',
};
