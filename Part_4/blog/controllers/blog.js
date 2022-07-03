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

blogsRouter.delete("/:id", async (request, response, next) => {
  const requestId = request.params.id
  try {
    await Blog.findByIdAndDelete(requestId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const updateObject = request.body
  try {
    await Blog.findByIdAndUpdate(request.params.id, updateObject)
    response.status(200).json(updateObject)
  } catch (exception) {
    next(exception)
  }
})
module.exports = blogsRouter
