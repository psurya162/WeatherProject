import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCloud, faWind, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import Header from "./Header";

const API_KEY = "adde523218dc181ec91c00b21a3712b2";

const WeatherCard2 = () => {
  const [city, setCity] = useState("");
  const [weatherList, setWeatherList] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [darkMode, setDarkMode] = useState(false); 

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeatherApi = async (cityName) => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = response.data; 
      setWeatherList((prevWeatherList) => [...prevWeatherList, data]);
      setLoading(false); 
      setError(null);
    } catch (err) {
      if (!err.response) {
        setError("Network error"); 
      } else {
        setError(err.response.data.message); 
      }
      setLoading(false); 
    }
  };

  // Function to handle form submission for city
  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
      alert("Please enter city name");
    } else {
      fetchWeatherApi(city); 
      setCity(""); 
    }
  };

  // Function to handle change in input field
  const handleChange = (e) => {
    setCity(e.target.value); 
  };

  // Function to toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode"); 
  };

  const clearWheatherlist=()=>{
    setWeatherList([])
  }

  return (
    <>
      <Header/>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="input-field">
              <input
                type="text"
                onChange={handleChange}
                value={city}
                placeholder="Enter City Name"
              />
            </div>
            <div className="button-container">
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="toggle-btn">
            <button onClick={toggleTheme}>
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
            <button onClick={clearWheatherlist}>Clear The List</button>
          </div>
        </div>
        <div className="loading-section">{loading && <p>Loading...</p>}</div>
        <div className="error-section">{error && <p>{error}</p>}</div>
        <div className="parent-container">
          {weatherList.map((weather, index) => (
            <div key={index} className="weather-card-section">
              <div className="weather-card-body">
                <div className="card-header">
                  <h2>{weather.name}</h2>
                </div>
                <div className="card-content">
                  <p><FontAwesomeIcon icon={faWind} /> Speed: {weather.wind.speed}</p>
                  <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {weather.main.temp} °C</p>
                  <p><FontAwesomeIcon icon={faCloud} /> Weather: {weather.weather[0].description}</p>
                  <p><FontAwesomeIcon icon={faSun} /> Humidity: {weather.main.humidity}</p>
                  <p> Clouds: {weather.clouds.all}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherCard2;
