import React from 'react'

const Language = ({ name }) => {
  console.log("name.language", name.name)
  return (
    <li>
      {name.name}
    </li>
  )
}

export default Language
