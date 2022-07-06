import React from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Name = ({ name, handleDeleteName }) => {
  // console.log("name.name", name.name.includes(persons))
  return (
    <div>
      {name.name} {name.number}{" "}
      <Button handleClick={() => handleDeleteName(name.id)} text={"delete"} />
    </div>
  );
};
export default Name;
