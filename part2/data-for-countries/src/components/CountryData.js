import { useEffect, useState } from "react";
import React from "react";
import CountryLanguage from "./CountryLanguage";
import axios from "axios";

const CountryData = ({ country }) => {
  console.log(country.languages, "country data");
  const [temperature, setTemperature] = useState([]);
  const [wind, setWind] = useState([]);

  useEffect(() => {
    console.log("effect weather");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        console.log(response.data, "response weather");
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
      });
  }, []);

  console.log("render", temperature, "temp");
  console.log("render", wind, "wind");
  // console.log("render", weathers.temp, "weathers temp");

  // const languages = () =>
  //   country.languages.map((name, i) => <CountryLanguage key={i} name={name} />);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      {/* <p>Languages: {languages()}</p> */}
      {/* <li>{country.languages}</li> */}
      <div>
        Languages:{" "}
        {country.languages.map((country) => (
          <CountryLanguage country={country} />
        ))}
      </div>
      <img src={country.flag} alt={""} />
      <h2>Weather in {country.name}</h2>
      <p>Temperature: {temperature}</p>
      <p>Wind: {wind} m/s</p>
    </div>
  );
};
export default CountryData;
