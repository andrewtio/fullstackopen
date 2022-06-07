import { useEffect, useState } from "react";
import Country from "./components/Country";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response, "response country");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
    console.log(filter, "Filter");
  };

  console.log("render", countries.length, "countries");

  return (
    <div>
      <h2>Countries</h2>
      <h3>
        Find Countries: <input value={filter} onChange={handleFilterChange} />{" "}
      </h3>

      <p>
        <Country key={countries.cca2} filter={filter} countries={countries} />
      </p>
    </div>
  );
};

export default App;
