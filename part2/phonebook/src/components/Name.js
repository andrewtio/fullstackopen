import React from "react";

const Name = ({ name }) => {
  // console.log("name.name", name.name.includes(persons))
  return (
    <div>
      {name.name} {name.number}
    </div>
  );
};
export default Name;
