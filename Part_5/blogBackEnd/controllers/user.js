const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")

usersRouter.get("/", async (request, response, next) => {
  // just gets all the users and responds with them
  try {
    const users = await User.find({}).populate("blogs", { title: 1 })
    response.json(users)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post("/", async (request, response, next) => {
  // this is the function to create a user
  try {
    //making a newUser object
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      response.status(400).json({
        error: "password must be more than 3 characters long",
      })
      return null
    } else if (!username || username.length < 3) {
      response.status(400).json({
        error: "the username must be more than 3 characters long",
      })
      return null
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      passwordHash,
      name,
    })

    //checkign for an existing user
    const existingUser = await User.findOne({ username: request.body.username })
    if (existingUser) {
      response.status(400).json({
        error: "username must be unique, name already taken",
      })
      return null
    }
    newUser.save()
    response.status(201).json(newUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
