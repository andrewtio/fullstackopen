import React from "react";
import personService from "../services/persons";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Name = ({ name }) => {
  // console.log("name.name", name.name.includes(persons))
  return (
    <div>
      {name.name} {name.number}{" "}
      <Button
        handleClick={() => {
          if (window.confirm("Do you really want to delete?")) {
            personService.deletePerson(name.id).then(() => {
              alert(`the '${name.name}' was already deleted`);
            });
          }
        }}
        text={"delete"}
      />
    </div>
  );
};
export default Name;
