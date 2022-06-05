import "./App.css";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

function App() {
  const dellons = useFetch;
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");

  const endPoint =
    "https://api.openweathermap.org/data/2.5/weather?lat=4.8472226&lon=6.974604&appid=fe5c3162eedad38f3e3ba54da2b43a04";
  const city = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fe5c3162eedad38f3e3ba54da2b43a04`;
  //   const key = "fe5c3162eedad38f3e3ba54da2b43a04";
  
  useEffect(() => {
    dellons(endPoint)
      .then((res) => {
        setWeather(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dellons]);

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      dellons(city).then((res) => {
        setLocation(res.data);
        setLocation("");
        setWeather(res.data);
      });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="search">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Search city"
            type="text"
          />
        </div>

        <p className="city-name">{weather.name}</p>
        {weather.main && <p className="temp">{weather.main.temp}°C</p>}
      </div>
    </div>
  );
}

export default App;
