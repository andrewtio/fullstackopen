import React from 'react'

const Total = (props) => {
  const exercises =
    props.parts.map(part => part.exercises)

  // console.log("exercisesArray", exercises)

  const totalExercises =
    exercises.reduce((s, p) => s + p)

  // console.log("parts", props.parts)
  // console.log("total", totalExercises)
  return (
    <>
      <p>
        <b>Total of exercises {totalExercises}
        </b>
      </p>
    </>
  )
}

export default Total