import { useState } from 'react';

interface Props {}

const LandingPage: React.FC<Props> = () => {
    const [displayDevices, setDisplayDevices] = useState<boolean>(false);

    return (
        <div className="App">
            <img src={require('../pictures/landing.png')} alt="landing page" style={{ width: '20%' }} />
            {displayDevices ? <p>This is the list of device</p> : <></>}
            <button
                onClick={() => {
                    setDisplayDevices(!displayDevices);
                }}>
                Search device
            </button>
        </div>
    );
};

export default LandingPage;
