import { useState, React } from "react";
import CountryData from "./CountryData";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const NameCountry = ({ country }) => {
  const [show, setShow] = useState(false);
  const countryDetailToShow = show ? <CountryData country={country} /> : "";
  // console.log("name.name", name.name.includes(persons))
  return (
    <li>
      {country.name}{" "}
      <Button
        handleClick={() => setShow(!show)}
        text={show ? "hide" : "show"}
      />
      <div>{countryDetailToShow}</div>
    </li>
  );
};
export default NameCountry;
