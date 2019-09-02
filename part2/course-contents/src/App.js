import React from 'react'
import Course from './components/Course'
import Title from './components/Title'

const App = ({ course }) => {
  // console.log("course", course)
  const courses = () =>
    course.map(course =>
      <Course
        key={course.id}
        course={course}
      />
    );
  // console.log("courses map", courses())
  return (
    <>
      <Title title={"Web Development Curriculum"} />
      {courses()}
    </>
  )
}

export default App