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

    if (weather != null) {
        return (<div className="App">
            <div className="inputBtn">
                <input placeholder="Enter city name" id="city" />
                <button onClick={() => {
                    setcity(document.getElementById('city').value);
                    setClick(!click);
                }}>Search</button>
              
            </div>
            <div className="cityProfile">
                <h1>{weather.name}</h1>
                <p >{weather.weather[0].description}</p>
                <h1 >{weather.main.temp}'C</h1>
                <p>
                    <span>Latitude: {weather.coord.lat}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Longitude: {weather.coord.lon}</span>
                </p>
            </div>
      <div>
      <ul className="ul">
                <li>Country : {weather.sys.country}</li>
                <li>Feels Like : {weather.main.feels_like}'C</li>
                <li>Humidity : {weather.main.humidity}g/kg</li>
                <li>Pressure : {weather.main.pressure} Pa</li>
                <li>Max Temperature : {weather.main.temp_max}'C</li>
                <li>Min Temperature : {weather.main.temp_min}'C</li>
                <li>Wind Direction : {weather.wind.deg} degree</li>
                <li>Wind Speed : {weather.wind.speed}m/s</li>
            </ul>
      </div>
        </div>)
    }
    else {
        return (
            <div className="inputBtn">
                <input placeholder="Enter city name" id="city" />
                <button onClick={() => {
                    setcity(document.getElementById('city').value);
                    setClick(!click);
                }}>Search</button>
               
            </div>
        )
    }
}

export default App;
