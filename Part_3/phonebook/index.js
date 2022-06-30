const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(express.json())
app.use(express.static("./build"))
app.use(
  morgan(function (tokens, req, res) {
    if (req.method === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify(req.body),
      ].join(" ")
    }
  })
)

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
]

const generateId = () => {
  const id = persons.length === 0 ? 0 : Math.max(...persons.map((p) => p.id))

  console.log("generated new max ID being: ", id + 1)
  return id + 1
}

app.get("/", (request, response) => {
  console.log("someone requested the homepage")
  response.send("<h1>Well hello there young traveller</h1>")
})

app.get("/api/persons", (request, response) => {
  console.log("someone has requested the main people page")
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find((p) => p.id === Number(request.params.id))

  if (!person) {
    response.status(404).end()
  }

  console.log(`someonse has requested the person: ${person.name} `)
  response.json(person)
})

app.get("/info", (request, response) => {
  console.log("someone has requested the information page")
  response.send(
    `<div><p>Phonebook has info for ${
      persons.length
    }</p><p>${new Date()}</p></div>`
  )
})

app.delete("/api/persons/:id", (request, response) => {
  const person = persons.find((p) => p.id == request.params.id)

  if (!person) {
    console.log("request to Delete rejected, person not found")
    response.status(204).end()
    return null
  }

  console.log(`request to delete ${person.name}`)
  persons = persons.filter((p) => p !== person)
  console.log("deleted person")
  console.log(persons)
  response.json(persons)
})

app.post("/api/persons", (request, response) => {
  console.log("someone has requested to add to our list of numbers")
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    console.log("no name or number ")
    response.status(400).end("no name or no number")
    return null
  } else if (persons.find((p) => p.name === name)) {
    console.log("name is already in the array")
    response.status(400).send("name is already in the list")
    return null
  }

  const person = {
    id: generateId(),
    name: name,
    number: number,
  }

  persons.push(person)

  console.log("updated the persons list after POST update ", persons)

  response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`App is listening on ${PORT} `)
