import React from "react";

const Name = ({ name, persons }) => {
  console.log("name.name", name.name.includes(persons))
  return (
    <div>
      {name.name}
    </div>
  )
}
export default Name;