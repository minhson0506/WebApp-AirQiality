import {useMainContext} from "../contexts/MainContext";

interface Props {
    data: string[];
}

const PickerComponent: React.FC<Props> = (props: Props) => {
    const {setIndicator} = useMainContext();
    return (
        <select name="select indicator" onChange={e => {setIndicator(e.target.value)}}>
            {props.data.map((item: string) => {
                return <option value={item}>{item}</option>;
            })}
        </select>
    );
};

export default PickerComponent;
