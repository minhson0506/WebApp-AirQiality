import {useState} from "react";
import Calendar from "./Calendar";

interface Props {}

const Chart: React.FC<Props> = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState<string|null>(null);
    
    const showDetailsHandle = (dayStr: string) => {
        setData(dayStr);
        setShowDetails(true);
      };

    return (
        <div style={{height: '100%'}}>
            <p> This is Chart Page </p>
            <Calendar showDetailsHandle={showDetailsHandle} />
            {showDetails ? <p>{data}</p> : <></>}
        </div>
    );
};

export default Chart;
