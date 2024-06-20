import React, { useState } from 'react';
import clear from '../Assert/clear.png';
import search_icon from '../Assert/search.png';
import cloud from '../Assert/cloud.png';
import humdityicon from '../Assert/humidity.png';
import wind from '../Assert/wind.png';
import drizzle from '../Assert/drizzle.png';
import rain from '../Assert/rain.png';
import   clear_icon  from '../Assert/clear.png' ;
import  snow_icon from '../Assert/snow.png' ;
import './wherther.css';

const Whether = () => {
  let apikey = '6fd0ae54c982d997c6a34f2c0f9884fa';
  const [wicon,setwicon] = useState(cloud)
  const search = async () => {
    try {
      const element = document.querySelector('.cityinput');
      if (!element || element.value === '') {
        return;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${apikey}`;

      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      const humidity = document.querySelector('.humidity-percent');
      const windRate = document.querySelector('.windrate');
      const temperature = document.querySelector('.weather-temp');
      const location = document.querySelector('.weatherl-location');

      humidity.innerHTML = `${data.main.humidity}%`;
      windRate.innerHTML = `${data.wind.speed} km/h`;
      temperature.innerHTML = `${data.main.temp}°C`;
      location.innerHTML = data.name;
      
        if(data.weather[0].icon==="01d"||data.weather.icon==="01n"){

              setwicon(clear_icon)
        } else if (data.weather[0].icon==="02d"||data.weather.icon==="02n"){

               setwicon(cloud);
        }else if (data.weather[0].icon==="03d"||data.weather.icon==="03n"){

          setwicon(drizzle);
        }else if (data.weather[0].icon==="04d"||data.weather.icon==="04n"){

           setwicon(drizzle);
        }else if (data.weather[0].icon==="09d"||data.weather.icon==="09n"){

           setwicon(rain);
        }else if (data.weather[0].icon==="10d"||data.weather.icon==="10n"){

             setwicon(rain);
        }else if (data.weather[0].icon==="13d"||data.weather.icon==="13n"){

              setwicon(snow_icon);
     } else{

          setwicon(clear_icon)
     }

      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityinput" placeholder="city" />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="icon" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="cloud" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weatherl-location">London</div>

        <div className="data-container">
          <div className="element">
            <img src={humdityicon} className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} className="icon" />
            <div className="data">
              <div className="windrate">64 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Whether;
