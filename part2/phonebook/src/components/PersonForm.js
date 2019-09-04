import React from 'react'

const PersonForm = ({
  newName,
  newNumber,
  addName,
  handleNameChange,
  handleNumberChange
}) => {

  return (
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
  )
}

export default PersonForm