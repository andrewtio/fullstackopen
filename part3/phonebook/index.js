const e = require("express");
const { request } = require("express");
const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// GET
app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info of ${persons.length} people <br><br> ${Date()}`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// DELETE

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => {
    return person.id !== id;
  });
  console.log("persons", persons);
  response.status(204).end();
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => {
    console.log(
      "note delete",
      note.id,
      typeof note.id,
      id,
      typeof id,
      note.id === id
    );
    return note.id !== id;
  });
  console.log("notes", notes);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
