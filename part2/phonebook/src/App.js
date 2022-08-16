import React, { useState, useEffect } from "react";
import "./index.css";
import Name from "./components/Name";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("Effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) => {
    const filterUpperCase = filter.toUpperCase();
    const personUpperCase = person.name.toUpperCase();
    return personUpperCase.includes(filterUpperCase);
  });

  const rows = () =>
    personsToShow.map((name, i) => (
      <Name key={i} name={name} handleDeleteName={handleDeleteName} />
    ));

  const handleDeleteName = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      personService
        .deletePerson(id)
        .then(() => {
          setNotificationMessage(
            `Person '${
              persons.find((person) => person.id === id).name
            }' was already deleted`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of '${
              persons.find((person) => person.id === id).name
            }' has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const handleAddName = (event) => {
    event.preventDefault();
    const person = persons.find((n) => n.name === newName);
    const changedPerson = { ...person, number: newNumber };

    if (persons.some((e) => e.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((e) => (e.id !== person.id ? e : returnedPerson))
            );
          });
        setNewName("");
        setNewNumber("");
      } else {
        alert("do nothing");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Added '${newName}'`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log("event.target.value Name", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("event.target.value Number", event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={handleAddName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons rows={rows} />
    </>
  );
};

export default App;
