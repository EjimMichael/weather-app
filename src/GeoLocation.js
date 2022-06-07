import { useState, useEffect } from 'react';

const GeoLocation = () => {
    const [weather, setWeather] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (weather) => {
        setWeather({
            loaded: true,
            coordinates: {
                lat: weather.coords.latitude,
                lng: weather.coords.longitude
            },
        });
    };
 
    const onError = (error) => {
        setWeather({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return weather;
}
 
export default GeoLocation;