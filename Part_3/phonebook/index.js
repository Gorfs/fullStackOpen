require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const Person = require("./models/person")
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

app.get("/", (request, response) => {
	console.log("someone requested the homepage")
	response.send("<h1>Well hello there young traveller</h1>")
})

app.get("/api/persons", (request, response) => {
	console.log("someone has requested the main people page")
	Person.find({})
		.then((people) => {
			response.json(people)
		})
		.catch((err) => next(err))
})

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			console.log("person = ", person)
			response.json(person)
		})
		.catch((err) => {
			next(err)
		})
})

app.get("/info", (request, response, next) => {
	console.log("someone has requested the information page")
	Person.find({})
		.then((people) => {
			response.send(
				`<p>Phonebook has info for ${people.length} people</p>${Date()}<p> </p>`
			)
			return people
		})
		.catch((err) => next(err))
})

app.delete("/api/persons/:id", (request, response) => {
	console.log("REQUEST TO DELTE PERSON")
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			console.log("PERSON DELETED SUCESSFULLY")
			response.status(204).end()
		})
		.catch((err) => {
			console.log(err)
			response.status(500).end()
		})
})

app.post("/api/persons", (request, response, next) => {
	console.log("someone has requested to add to our list of numbers")
	const name = request.body.name
	const number = request.body.number
	let reject = false

	Person.findOne({ name: name }).then((person) => {
		if (person !== null) {
			console.log("person is already in the array", person)
			reject = true
			response
				.status(400)
				.end("requets rejected, person is already in the array")
			return null
		} else if (!name || !number) {
			console.log("no name or number ")
			response.status(400).end("no name or no number")
			return null
		} else {
			console.log("reject is currently ", reject)
			const person = new Person({
				name: name,
				number: number,
			})
			console.log("PERSON OBJECT HAS BEEN MADE")

			person
				.save()
				.then((result) => {
					console.log("updated the persons list after POST update")
					response.json(person)
				})
				.catch((err) => next(err))
		}
	})
})

app.put("/api/persons/:id", (request, response) => {
	console.log("REQUEST TO UPDATE PERSON", request.params.id)

	const updatedPerson = {
		name: request.body.name,
		number: request.body.number,
	}

	Person.findByIdAndUpdate(request.params.id, updatedPerson)
		.then((person) => {
			return response.json(person)
		})
		.catch((err) => next(err))
})

const errorHandler = (error, request, response, next) => {
	if (error.name === "CastError") {
		return response.status(400).send("malformed id")
	} else if (error.name === "ValidationError") {
		console.log("THE HANDELER HAS RECIEVED THE ERROR")
		return response.status(400).json({ error: error })
	}
	console.log(error)
	next(error)
}

app.use(errorHandler)

app.listen(PORT)
console.log(`App is listening on ${PORT} `)
