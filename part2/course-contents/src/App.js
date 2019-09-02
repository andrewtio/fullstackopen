import React from 'react'
import Course from './components/Course'

const App = ({ course }) => {
  console.log("course", course)
  const courses = () =>
    course.map(course =>
      <Course
        key={course.id}
        course={course}
      />
    );
  console.log("courses map", courses())
  return (
    <>
      {courses()}
    </>
  )
}

export default App