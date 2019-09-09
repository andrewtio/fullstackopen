import React from 'react'
import Language from './Language'

const CountryDetailData = ({ name }) => {

  console.log("name", name)
  const languages = () =>
    name.languages.map((name, i) =>
      <Language
        key={i}
        name={name}
      />
    )

  return (
    <>
      <div>Capital : {name.capital}</div>
      <div>Population: {name.population}</div>
      <div>Languages: {languages()}</div>
      <div><img src={name.flag}></img></div>
    </>
  )
}

export default CountryDetailData