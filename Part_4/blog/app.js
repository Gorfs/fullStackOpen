const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")

const blogsRouter = require("./controllers/blog")
const usersRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")

const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info(`connecting to ${config.mongoUrl}`)
app.use(express.json())
app.use(middleware.tokenExtractor)

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to the DB")
  })
  .catch((err) => {
    logger.error(err)
  })

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.use(cors)
//app.use(express.static("build"))

app.use(middleware.requestLogger)

module.exports = app
