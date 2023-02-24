import "./dashboard.css";
import Search from "../search/search";
import CurrentWeather from "../current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import { useEffect, useState } from "react";
import Forecast from "../forecast/forecast";
import { Navigate } from "react-router-dom";
import StartupWeather from "../opening-weather/startupWeather";

const Dashboard = () => {
  const sLat = 6.927079;
  const sLon = 79.861244;
  const city = [sLat, " ", sLon];
  const [startupWeather, setstartupWeather] = useState(null);

  const startupWeatherFetch = fetch(
    `${WEATHER_API_URL}/weather?lat=${sLat}&lon=${sLon}&appid=${WEATHER_API_KEY}&units=metric`
  );

  Promise.all([startupWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();

        setstartupWeather({ city: city.label, ...weatherResponse });
      })

      .catch((err) => console.log(err));

      console.log(startupWeather);

  //-------------------

  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForcast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.label, ...forecastResponse });
      })

      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  if (!authenticated) {
    return <Navigate replace to="/dashboard" />;
  } else {
    return (
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {startupWeather && <StartupWeather data={startupWeather} />}
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    );
  }
};
export default Dashboard;
