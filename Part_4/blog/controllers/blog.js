const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogsRouter.get("/", (request, response) => {
  logger.info("ROUTER | person has request /")
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
