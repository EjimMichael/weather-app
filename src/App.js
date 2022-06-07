import "./App.css";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import SearchIcon from '@mui/icons-material/Search';
import GeoLocation from "./GeoLocation";

function App() {
  const axiosCall = useFetch;
  const key = "fe5c3162eedad38f3e3ba54da2b43a04";
  const weather = GeoLocation(); 
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState('');

  const endPoint = `http://api.openweathermap.org/data/2.5/weather?lat=${weather.coordinates.lat}&lon=${weather.coordinates.lng}&appid=${key}&units=metric`;
  const cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe5c3162eedad38f3e3ba54da2b43a04&units=metric`;

    useEffect(() => {
      weather.loaded &&
        axiosCall(endPoint).then((res) => {
          setLocation(res.data);
        }); 
    }, [axiosCall, endPoint, weather.loaded])


  const searchCity = (e) => {
    if (e.key === "Enter") {
      axiosCall(cityAPI).then((res) => {
        setCity(res.data);
        setCity("");
        setLocation(res.data);
      }).catch(err => {
        setError(err.response.data.message);
        setLocation(error);
        setCity("");
      });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="search">
          <SearchIcon className="search-icon" />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={searchCity}
            placeholder="Search city..."
            type="text"
          />
        </div>

        <div className="top">
          <div className="city-name">{location.name}</div>
          {location.main && <div className="temp">{location.main.temp}°C</div>}
        </div>
        <div className="error">{error}</div>

        <div className="bottom">
          {location.weather && (
            <div className="main">{location.weather[0].main}</div>
          )}
          {location.main && (
            <div className="humidity">{location.main.humidity}%</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
