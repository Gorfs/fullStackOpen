const mongoose = require("mongoose")
const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: "password or username invalid",
      })
      return null
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, config.SECRET)
    console.log("user has been logged in", {
      token,
      username: user.username,
      name: user.name,
    })
    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user.id })
  } catch (exception) {
    next(exception)
  }
})

module.exports = loginRouter
