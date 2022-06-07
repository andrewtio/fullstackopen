import React from "react";
import NameCountry from "./NameCountry";
import CountryData from "./CountryData";

const Country = ({ countries, filter }) => {
  console.log(countries, "country.countries");
  const filteredCountry = countries.filter((country) => {
    const filterUpperCase = filter.toUpperCase();
    const countryUpperCase = country.name.toUpperCase();
    return countryUpperCase.includes(filterUpperCase);
  });
  return (
    <div>
      {filteredCountry.length < 10 ? (
        <div>
          {filteredCountry.map((country) => (
            <NameCountry country={country} />
          ))}
        </div>
      ) : (
        <h3>Too many matches, specify another filter</h3>
      )}
      {filteredCountry.length === 1 ? (
        <div>
          {filteredCountry.map((country) => (
            <CountryData country={country} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Country;
