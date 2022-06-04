import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [getWeather, setGetWeather] = useState("");
  const [location, setLocation] = useState("");
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fe5c3162eedad38f3e3ba54da2b43a04`;
  //   const key = "fe5c3162eedad38f3e3ba54da2b43a04";


  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=4.8472226&lon=6.974604&appid=fe5c3162eedad38f3e3ba54da2b43a04"
    )
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setGetWeather(data);
      });
  }, []);

  const searchLocation = (e) => {
    // useEffect((e) => {
      if (e.key === "Enter") {
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setLocation(data);
            setLocation("");
          });
      }
    // });
  } 

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="search">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder={'Search city'}
          />
        </div>

        <p className="city-name">{getWeather.name}</p>
        {getWeather.main ? (
          <p className="temp">{getWeather.main.temp}°C</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;

