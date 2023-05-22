import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import ChartPage from '../components/ChartPage';

interface Props {}

const HomePage: React.FC<Props> = () => {
    // tab data
    const [state, setState] = useState({
        data: [
            { text: 'Home', icon: 'fa fa-home', key: 0, selected: true },
            { text: 'Chart', icon: 'fa fa-bar-chart', key: 1, selected: false },
            { text: 'Settings', icon: 'fa fa-cogs', key: 2, selected: false },
        ],
        current: 0,
    });

    return (
        <div>
            {state.current === 0 ? <Dashboard/> : state.current === 1 ? <ChartPage/> : <Setting/>}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0 auto',
                    width: '90%',
                    height: '100px',
                    marginTop: '16%',
                }}>
                {state.data.map((item) => {
                    return (
                        <div
                            key={item.key}
                            className="tab"
                            onClick={() => {
                                if (item.key === state.current) return;
                                let tabData = state.data;
                                tabData[item.key].selected = true;
                                tabData[state.current].selected = false;
                                setState({ data: tabData, current: item.key });
                            }}
                            style={{
                                backgroundColor: item.selected ? '#E7ECEA' : '#DDE2E0',
                                borderTop: item.selected ? 'solid 4px #57C185' : 'none',
                            }}>
                            <i
                                className={item.icon}
                                style={{
                                    color: item.selected ? '#57C185' : '#576574',
                                    fontSize: '2em',
                                    marginTop: '5%',
                                }}></i>
                        
                            <p
                                style={{
                                    color: item.selected ? '#57C185' : '#576574',
                                }}>
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
