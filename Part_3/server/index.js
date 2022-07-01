require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT
const cors = require("cors")
const app = express()

const Note = require("./models/note")

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(express.static("build"))
app.use(express.json())
app.use(requestLogger)
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

app.get("/", (request, response) => {
  response.send("<p> This is the backend server API giving you this page </p>")
})

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.post("/api/notes", (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => next(err))
})

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((err) => {
      next(err)
    })

  response.status(204).end()
})

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((err) => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// HAS TO BE THE LAST LOADED MIDDLEWARE
app.use(errorHandler)

app.listen(PORT)
console.log(`server running on port ${PORT}`)
