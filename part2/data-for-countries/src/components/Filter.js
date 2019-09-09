import React from 'react'

const Filter = ({ text, filter, setFilter }) => {
  const handleFilterChange = event => {
    console.log("event.target.value Filter", event.target.value)
    setFilter(event.target.value)
  }

  return (
    <>
      {text}
      <input value={filter} onChange={handleFilterChange} />
    </>
  )

}

export default Filter