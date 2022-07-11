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

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("id", id);
  const note = notes.find((note) => {
    console.log(
      "note get no",
      note.id,
      typeof note.id,
      id,
      typeof id,
      note.id === id
    );
    return note.id === id;
  });
  console.log("note", note);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }

  // console.log("note", note);
  // response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
