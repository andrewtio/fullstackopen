import { useEffect, useState } from "react";
import React from "react";
import Language from "./Language";
import axios from "axios";

const CountryDetailData = ({ name }) => {
  console.log("name", name);
  const languages = () =>
    name.languages.map((name, i) => <Language key={i} name={name} />);
  const [temperature, setTemperature] = useState([]);
  const [wind, setWind] = useState([]);

  useEffect(() => {
    console.log("effect weather");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${name.latlng[0]}&lon=${name.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        console.log(response.data, "response weather");
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
      });
  }, []);

  return (
    <>
      <div>Capital : {name.capital}</div>
      <div>Population: {name.population}</div>
      <div>Languages: {languages()}</div>
      <div>
        <img src={name.flag}></img>
      </div>
      <h2>Weather in {name.name}</h2>
      <p>Temperature: {temperature}</p>
      <p>Wind: {wind} m/s</p>
    </>
  );
};

export default CountryDetailData;
