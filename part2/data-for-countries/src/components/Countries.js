import React from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({ rows, text, details }) => {
  if (rows().length > 10) {
    return (
      <div>
        {text}
      </div>
    )
  }
  // console.log("length", rows().length)

  return (
    <>
      {rows()}
      <CountryDetail rows={rows} details={details} />
    </>
  )
}

export default Countries