import {useMainContext} from "../contexts/MainContext";

interface Props {
    data: string[];
}

const PickerComponent: React.FC<Props> = (props: Props) => {
    const {setIndicator, loading, setLoading} = useMainContext();
    return (
        <select name="select indicator" onChange={e => {setIndicator(e.target.value); setLoading(!loading)}}>
            {props.data.map((item: string) => {
                return <option value={item} key={item}>{item}</option>;
            })}
        </select>
    );
};

export default PickerComponent;
