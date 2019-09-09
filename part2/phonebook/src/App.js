import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Name from './components/Name'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  //console.log("persons.name", persons[0])

  useEffect(() => {
    console.log("Effect")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("Promise Fullfiled")
        console.log("Response.data", response.data)
        setPersons(response.data)
      })
  })

  const personsToShow = persons.filter(person => {
    const filterUpperCase = filter.toUpperCase()
    const personUpperCase = person.name.toUpperCase()
    return personUpperCase.includes(filterUpperCase)
  });

  console.log("PersonsToShow", personsToShow)
  console.log("Persons", persons)
  console.log("Includes", persons.includes('Arto Hellas'))

  const rows = () =>
    personsToShow.map((name, i) =>
      <Name
        key={i}
        name={name}
      />
    )

  console.log("rows", rows())

  const addName = event => {
    event.preventDefault()
    // const nameArray =
    //   newName

    // console.log("previous persons", persons);
    //setPersons(persons.push({ name: newName }));
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    }

    if (persons.some(e => e.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    }

    const phonebookObject = {
      name: newName,
      number: newNumber,
    };

    // setPersons(persons => [...persons, { name: newName }]); 
    // Ini dipakai jika ingin menambahkan nilai pada array object dengan single value
    setPersons(persons.concat(phonebookObject))
    setNewNumber('')
    setNewName('');
    console.log("phonebook Object", phonebookObject);
  }

  const handleNameChange = event => {
    console.log("event.target.value Name", event.target.value)
    setNewName(event.target.value)
  }
  // console.log("persons after add", persons)

  const handleNumberChange = event => {
    console.log("event.target.value Number", event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
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
  )
}

export default App