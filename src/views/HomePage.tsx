import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import ChartPage from '../components/ChartPage';
import { colors, flexBox } from '../styles';
import CSS from 'csstype';

const HomePage = () => {
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
        <div style={flexBox}>
            {state.current === 0 ? <Dashboard /> : state.current === 1 ? <ChartPage /> : <Setting />}
            <div style={bottomNavStyle}>
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
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <i
                                className={item.icon}
                                style={{
                                    color: item.selected ? colors.darkBlue : colors.darkGray,
                                    fontSize: '2em',
                                }}></i>

                            <p
                                style={{
                                    color: item.selected ? colors.darkBlue : colors.darkGray,
                                    fontWeight: item.selected ? 'bold' : 'normal',
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

export const bottomNavStyle: CSS.Properties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    background: 'white',
    height: '60px',
};
