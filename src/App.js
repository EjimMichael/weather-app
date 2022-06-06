import "./App.css";
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

function App() {
  const axiosCall = useFetch;
  const key = "fe5c3162eedad38f3e3ba54da2b43a04";
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  const cityAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe5c3162eedad38f3e3ba54da2b43a04&units=metric`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    axiosCall(endPoint)
    .then(res => {
      setLocation(res.data);
    })
  }, [axiosCall, endPoint]);

  // useEffect(() => {
  //   axiosCall(endPoint)
  //     .then((res) => {
  //       setLocation(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [axiosCall]);

  const searchCity = (e) => {
    if (e.key === "Enter") {
      axiosCall(cityAPI).then((res) => {
        setCity(res.data);
        setCity("");
        setLocation(res.data);
      });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="search">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={searchCity}
            placeholder="Search city"
            type="text"
          />
        </div>

        <p className="city-name">{location.name}</p>
        {location.main && <p className="temp">{location.main.temp}°C</p>}
        <div className="right">
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
