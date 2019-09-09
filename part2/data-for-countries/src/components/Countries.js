import React from 'react'

const Countries = ({ rows, text }) => {
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
    </>
  )
}

export default Countries