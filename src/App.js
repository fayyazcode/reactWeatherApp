import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
    const [click, setClick] = useState(true);
    const [weather, setWeather] = useState(null);
    const [city, setcity] = useState(null);
    let date = new Date();
    // console.log(time);
    let lat, long;
    useEffect(() => {
    

        if (city != null) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`)
                .then((res) => {
                    const newWeather = res.data;
                    setWeather(newWeather);
                }).catch((err) => { console.log(err) 
                if(err=="Error: Request failed with status code 400"){
                    alert("Please fill input and Search again !")
                }else{
                    alert("City not found !")
                }
                }
                )
        }
        else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
            function showPosition(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`)
                    .then((res) => {
                        const newWeather = res.data;
                       
                        setWeather(newWeather);
                    }).catch((err) => {console.log(`Something went wrong!\n${err}`) 
                   
                })
               
            }
        }
    }, [click, city, lat, long])


}

export default App;
