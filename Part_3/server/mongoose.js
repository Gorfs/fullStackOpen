const mongoose = require("require mongoose")

if (process.argv.length < 3) {
  console.log("you must input a password | node mongoose.js <password>")
  process.end(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.tskiu.mongodb.net/PhoneBook?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  person: {
    type: String,
    minLength: 5,
  },
  number: String,
})
