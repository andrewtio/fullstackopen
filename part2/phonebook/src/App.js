import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  //console.log("persons.name", persons[0])



  const addName = event => {
    event.preventDefault()
    // const nameArray =
    //   newName

    // console.log("previous persons", persons);
    //setPersons(persons.push({ name: newName }));
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    }

    setPersons(persons => [...persons, { name: newName }]);
    setNewName('');
    // console.log("current persons", persons);
  }

  console.log("Persons", persons)
  console.log("Includes", persons.includes('Arto Hellas'))

  const handleNameChange = event => {
    console.log("event.target.value", event.target.value)
    setNewName(event.target.value)
  }
  // console.log("persons after add", persons)

  const rows = () =>
    persons.map((name, i) =>
      <Name
        key={i}
        name={name}
        persons={persons}
      />
    )


  console.log("rows", rows().includes('Arto Hellas'))

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
        <div>
          debug: {newName}
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </>
  )
}

export default App