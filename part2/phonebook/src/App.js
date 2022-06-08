import React, { useState, useEffect } from "react";
import Name from "./components/Name";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  //console.log("persons.name", persons[0])

  useEffect(() => {
    console.log("Effect");
    // Before update using axios direct
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("Promise Fullfiled");
    //   console.log("Response.data", response.data);
    //   setPersons(response.data);
    // });

    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  });

  const personsToShow = persons.filter((person) => {
    const filterUpperCase = filter.toUpperCase();
    const personUpperCase = person.name.toUpperCase();
    return personUpperCase.includes(filterUpperCase);
  });

  console.log("PersonsToShow", personsToShow);
  console.log("Persons", persons);
  console.log("Includes", persons.includes("Arto Hellas"));

  const rows = () =>
    personsToShow.map((name, i) => <Name key={i} name={name} />);

  console.log("rows", rows());

  const addName = (event) => {
    event.preventDefault();

    // console.log("previous persons", persons);
    //setPersons(persons.push({ name: newName }));
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    }

    if (persons.some((e) => e.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // Before update using direct axios
    // axios
    //   .post("http://localhost:3001/persons", personObject)
    //   .then((response) => {
    //     setPersons(persons.concat(response.data));
    //     setNewNumber("");
    //     setNewName("");
    //   });

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    console.log("event.target.value Name", event.target.value);
    setNewName(event.target.value);
  };
  // console.log("persons after add", persons)

  const handleNumberChange = (event) => {
    console.log("event.target.value Number", event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons rows={rows} />
    </>
  );
};

export default App;
