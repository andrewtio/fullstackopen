import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  //console.log("persons.name", persons[0])

  const personsToShow = persons.filter(person => {
    const filterUpperCase = filter.toUpperCase()
    const personUpperCase = person.name.toUpperCase()
    return personUpperCase.includes(filterUpperCase)
  });
  console.log("PersonsToShow", personsToShow)

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

  console.log("Persons", persons)
  console.log("Includes", persons.includes('Arto Hellas'))


  const handleNameChange = event => {
    console.log("event.target.value Name", event.target.value)
    setNewName(event.target.value)
  }
  // console.log("persons after add", persons)

  const handleNumberChange = event => {
    console.log("event.target.value Number", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    console.log("event.target.value Filter", event.target.value)
    setFilter(event.target.value)
  }



  const rows = () =>
    personsToShow.map((name, i) =>
      <Name
        key={i}
        name={name}
      />
    )


  console.log("rows", rows().includes('Arto Hellas'))

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        Filter Shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
        <div>
          debug name: {newName}
        </div>
        <div>
          debug number: {newNumber}
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </>
  )
}

export default App