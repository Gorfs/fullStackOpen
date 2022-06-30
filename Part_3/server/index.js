const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.static("build"))

app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "Archie is soo cool",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
]

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.get("/", (request, response) => {
  response.send("<p> This is the backend server API giving you this page </p>")
})

app.get("/api/notes", (request, response) => {
  response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post("/api/notes", (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.put("/api/notes/:id", (request, response) => {
  const newObject = request.body
  console.log(
    "request to change note with ID:",
    request.params.id,
    " with ",
    newObject.important
  )

  if (!notes.find((n) => n.id === Number(request.params.id))) {
    console.log("request to change note denied, ID not match")
    response.status(404).end()
    return null
  }

  console.log("request to change not granted, ID match")
  const newNotes = notes.map((note) => {
    if (note.id == Number(request.params.id)) {
      return newObject
    } else {
      return note
    }
  })
  notes = newNotes
  console.log("notes have been updated to ", notes)

  response.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)
