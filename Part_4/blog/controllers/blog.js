const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const logger = require("../utils/logger")

blogsRouter.get("/", (request, response) => {
  logger.info("ROUTER | person has request /")
  logger.info(request.body, "IS THE REQUEST BODY")
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post("/", async (request, response, next) => {
  console.log("BEFORE CATCH ", request.body)
  try {
    console.log("request body is ", request.body)
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    const savedNote = await blog.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const requestId = request.params.id
  try {
    Blog.findByIdAndDelete(requestId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
