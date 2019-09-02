import React from 'react'

const Total = (props) => {
  return (
    <>
      <p>
        <b>Total of exercises {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises +
          props.parts[3].exercises}
        </b>
      </p>
    </>
  )
}

export default Total