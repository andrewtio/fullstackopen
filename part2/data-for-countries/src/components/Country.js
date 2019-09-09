import React from 'react'

const Country = ({ name }) => {
  console.log("country", name)
  return (
    <>
      <div>{name.name}</div>
    </>
  )
}

export default Country