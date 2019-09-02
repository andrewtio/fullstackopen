import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  // console.log("parts content", parts)
  const rows = () =>
    parts.map((part, i) =>
      <Part
        key={i}
        name={part.name}
        part={part.parts}
        exercises={part.exercises}
      />
    )

  return (
    <>
      {rows()}
    </>
  )
}

export default Content