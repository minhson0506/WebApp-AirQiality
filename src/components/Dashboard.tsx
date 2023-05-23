import { useEffect, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getLatestSensorData } from '../hooks/queries';
import { SensorData } from '../interfaces/SensorData';
import { Weather } from '../interfaces/Weather';

interface Props {}

const Dashboard: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { deviceName, location } = useMainContext();

    const [seconds, setSeconds] = useState(0);
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);

    // get latest data
    const updateData = async () => {
        const data = await doGraphQLFetch(apiUrl, getLatestSensorData, { deviceName: deviceName });
        // console.log('data latest', data);
        setSensorData(data.latestSensorData[0]);
    };

    // get weather data
    const getWeatherData = async () => {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=ed7111cc88ee4769858141158222207&q=${location}&aqi=yes&day=10`,
        );
        if (!response.ok) {
            console.log('error');
            return;
        }
        const json = await response.json();
        // console.log('weather', json);
        setWeather(json);
    };

    useEffect(() => {
        updateData();
        getWeatherData();
    }, []);

    // update data every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 100) {
                setSeconds(0);
            } else {
                setSeconds(seconds + 1);
            }
            updateData();
        }, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                style={{
                    width: '100%',
                    padding: '15px 20px 20px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <div style={{ paddingTop: '10px' }}>
                    {sensorData !== null ? (
                        <>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#000000' }}>
                                {new Date(sensorData.time).toISOString().split('T')[0]}
                            </h1>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#000000' }}>
                                {new Date(sensorData.time).toISOString().split('T')[1].split('Z')[0]}
                            </h1>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img
                            src={require('../pictures/location.png')}
                            alt="location"
                            style={{ width: '20px', height: '20px', paddingBottom: '5px' }}
                        />
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000000', paddingLeft: '5px' }}>
                            {weather?.location?.name}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        //     {/* Text(
        //         text = if (weather?.location?.name != null && weather?.location?.name != "null") weather!!.location.name else "No location",
        //         fontFamily = bold,
        //         fontSize = 18.sp,
        //         color = Black
        //     )
        // } */}
        //             {/* Row(verticalAlignment = Alignment.CenterVertically) {
        //                 if (image != null) {
        //                     val myBitmap = BitmapFactory.decodeFile(image)
        //                     Image(
        //                         bitmap = myBitmap.asImageBitmap(),
        //                         contentDescription = weather?.current?.condition?.text,
        //                         modifier = Modifier
        //                             .size(50.dp)
        //                             .padding(end = 5.dp)
        //                     )
        //                 }
        //                 Text(
        //                     if (weather?.current?.temp != null)
        //                         weather?.current?.temp?.toInt().toString() + "°C" else "",
        //                     fontFamily = medium,
        //                     fontSize = 16.sp,
        //                     color = DarkGray
        //                 )
        //             }

        //         }
        //     }

        //     LazyVerticalGrid(
        //         columns = GridCells.Fixed(2),
        //     ) {
        //         items(dashboardArray) {
        //             var popupControl by remember { mutableStateOf(false) }

        //             Log.d(MainActivity.tag, "Dashboard: ${it?.name} & popup $popupControl")
        //             if (popupControl) {
        //                 Log.d(MainActivity.tag, "Dashboard: in popup ${it?.name}")
        //                 Popup(
        //                     alignment = Alignment.BottomCenter,
        //                     properties = PopupProperties(dismissOnClickOutside = true),
        //                     onDismissRequest = { popupControl = false }) {
        //                     Box(
        //                         Modifier
        //                             .size(300.dp, 150.dp)
        //                             .padding(top = 5.dp)
        //                             .background(LightBlue, RoundedCornerShape(10.dp))
        //                             .border(1.dp, color = Color.Black, RoundedCornerShape(10.dp))
        //                     ) {
        //                         Column(
        //                             modifier = Modifier
        //                                 .fillMaxSize()
        //                                 .padding(horizontal = 20.dp),
        //                             horizontalAlignment = Alignment.CenterHorizontally,
        //                             verticalArrangement = Arrangement.Center
        //                         ) {
        //                             if (it != null) {
        //                                 Column() {
        //                                     Text(
        //                                         text = it.desc, color = Color.Black,
        //                                         modifier = Modifier.padding(vertical = 5.dp),
        //                                         fontFamily = medium
        //                                     )
        //                                     if (it.outside != "") {
        //                                         Text(
        //                                             text = it.outside + " " + it.unit,
        //                                             color = Color.Black,
        //                                             modifier = Modifier.padding(vertical = 5.dp),
        //                                             fontFamily = medium
        //                                         )
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //             if (it == null) {
        //                 Card(
        //                     modifier = Modifier
        //                         .padding(bottom = 10.dp)
        //                         .height(1.dp),
        //                     backgroundColor = LightBlue
        //                 ) {
        //                 }
        //             } else {
        //                 Card(
        //                     modifier = Modifier.padding(all = 10.dp),
        //                     backgroundColor = White,
        //                     onClick = {
        //                         popupControl = !popupControl
        //                         Log.d(MainActivity.tag, "Dashboard: ${it.name}")
        //                     }
        //                 ) {
        //                     Column(
        //                         modifier = Modifier
        //                             .fillMaxWidth()
        //                             .padding(10.dp)
        //                     ) {
        //                         Row(verticalAlignment = Alignment.CenterVertically) {
        //                             Image(
        //                                 painterResource(id = it.image),
        //                                 contentDescription = "",
        //                                 modifier = Modifier
        //                                     .size(30.dp)
        //                                     .background(
        //                                         if (((it.data ?: 0.0) < minValue[it.id]) || ((it.data
        //                                                 ?: 0.0) > maxValue[it.id])
        //                                         ) Red else Green
        //                                     )
        //                                     .padding(5.dp),
        //                                 colorFilter = ColorFilter.tint(color = White)
        //                             )
        //                             Text(
        //                                 text = it.name,
        //                                 color = Black,
        //                                 fontSize = 20.sp,
        //                                 fontFamily = bold,
        //                                 modifier = Modifier.padding(top = 15.dp, start = 5.dp)
        //                             )

        //                         }
        //                         Column(
        //                             modifier = Modifier.fillMaxWidth(),
        //                             horizontalAlignment = Alignment.CenterHorizontally
        //                         ) {
        //                             NumberText(text = if (it.data != null) it.data.toString() else "")
        //                             UnitText(text = it.unit)
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // } */}
    );
};

export default Dashboard;
