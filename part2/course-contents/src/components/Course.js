import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (course) => {
  console.log("course props", course.course)
  return (
    <>
      <Header course={course.course.name} />
      <Content parts={course.course.parts} />
      <Total parts={course.course.parts} />
    </>
  )
}

export default Course