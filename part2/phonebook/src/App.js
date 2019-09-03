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

    console.log("previous persons", persons);
    //setPersons(persons.push({ name: newName }));
    setPersons(persons => [...persons, { name: newName }]);
    setNewName('');
    console.log("current persons", persons);
  }

  const handleNameChange = event => {
    console.log("event.target.value", event.target.value)
    setNewName(event.target.value)
  }
  console.log("persons after add", persons)

  const rows = () =>
    persons.map((name, i) =>
      <Name
        key={i}
        name={name}
      />
    )

  console.log("rows", rows())

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