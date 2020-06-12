import React, {useState, useEffect } from 'react'
import axios from 'axios'


const CountryView = ({onlyCountry}) => {
    const[cityWeather,setCityWeather] = useState({
        location:{
            name:''
        },
        current:{
            temperature: 0,
            weather_icons: [],
            wind_speed: 0,
            wind_dir: ''
        }
    });

    const hook = () =>{
        console.log('effect')
        axios
          .get('http://api.weatherstack.com/current?access_key='+process.env.REACT_APP_API_KEY+'&query='+onlyCountry.capital)
          .then(response =>{
            console.log('promise fulfilled')
            setCityWeather(response.data)
          })
      }   
    useEffect(hook,[])

    console.log(cityWeather)

    return (
        <div>
            <h1>{onlyCountry.name}</h1>
            capital {onlyCountry.capital} <br/>
            population {onlyCountry.population}
            <h1>language</h1>
            <ul>
                {onlyCountry.languages.map(language => 
                    <li key={language.name}>{language.name}</li>
                    )}
            </ul>
            <img src={onlyCountry.flag} alt={onlyCountry.name} width='150'></img>
            <h1>Weather in {cityWeather.location.name}</h1>
            <p><b>temperature:</b> {cityWeather.current.temperature} Celcius</p>
            <img src={cityWeather.current.weather_icons[0]} alt={cityWeather.location.name} width='100'></img>
                <p><b>wind:</b> {cityWeather.current.wind_speed} mph direction {cityWeather.current.wind_dir}</p>           
        </div>
    )
}

export default CountryView