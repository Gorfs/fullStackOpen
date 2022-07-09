const blogsRouter = require("express").Router()
const config = require("../utils/config")
const { findById, findByIdAndUpdate } = require("../models/blog")
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response, next) => {
  logger.info("ROUTER | person has request /")
  logger.info(request.body, "IS THE REQUEST BODY")
  try {
    const res = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(res)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  console.log("BODY IS ", request.token)
  try {
    const body = request.body

    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken) {
      response.status(401).json({
        error: "token missing of invalid",
      })
    }
    const user = await User.findOne({ username: decodedToken.username })

    if (!user) {
      response.status(400).json({
        error: "user not found",
      })
      return null
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: body.user,
    })

    const savedNote = await blog.save()

    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  const requestId = request.params.id
  try {
    const blogsUserId = await Blog.findById(requestId)
    console.log(blogsUserId)
    let user = await User.findById(blogsUserId.user)
    console.log(user)

    user = user.blogs.filter((blog) => blog.id === requestId)

    await Blog.findByIdAndDelete(requestId)
    await User.findByIdAndUpdate(blogsUserId, { blogs: user })

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
