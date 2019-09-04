import React from 'react'

const Filter = ({ filter, setFilter }) => {

  const handleFilterChange = event => {
    console.log("event.target.value Filter", event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      Filter Shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter