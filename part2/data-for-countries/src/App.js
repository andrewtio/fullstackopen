import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([

  ])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log("Effect")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        // console.log("Promise Fullfiled")
        // console.log("response.data", response.data)
        setCountries(response.data)
      })
  })
  // console.log("countries", countries)

  const countriesToShow = countries.filter(country => {
    const filterUpperCase = filter.toUpperCase()
    const countryUpperCase = country.name.toUpperCase()
    return countryUpperCase.includes(filterUpperCase)
  })
  // console.log("countriesToShow", countriesToShow)

  const rows = () =>
    countriesToShow.map((name, i) =>
      <Country
        key={i}
        name={name}
      />
    )

  // console.log("Rows", rows().length)

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        text={"Find Countries"}
      />

      <Countries
        rows={rows}
        text={"Too Many Matches, specify another filter"} />
    </>
  )
}

export default App