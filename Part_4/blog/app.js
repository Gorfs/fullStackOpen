const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blog")
//const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info(`connecting to ${config.mongoUrl}`)

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to the DB")
  })
  .catch((err) => {
    logger.error(err)
  })
app.use("/", blogsRouter)

app.use(cors)
//app.use(express.static("build"))
app.use(express.json)
// app.use(middleware.requestLogger)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app
