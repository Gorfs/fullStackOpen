const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connection to DB")
mongoose
	.connect(url)
	.then((result) => {
		console.log("Connected to MONGODB")
	})
	.catch((err) => {
		console.log("Connection to MONGODB failed |", err)
	})

const personSchema = mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (v) {
				return /^(\d{2}|\d{3})-\d/.test(v)
			},
			message: (props) =>
				`${props.value} is not a valid phone number, must be of the DDD-DDDD format`,
		},
		required: true,
	},
})

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model("Person", personSchema)
