/* eslint-disable no-undef */
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://phonebook:${password}@cluster0.vtyqg.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected Create");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then((result) => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("Connected Find");

    Person.find()
      .then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  });
}
