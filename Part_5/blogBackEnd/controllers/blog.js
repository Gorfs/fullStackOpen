const blogsRouter = require("express").Router()
const config = require("../utils/config")
const { findById, findByIdAndUpdate } = require("../models/blog")
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const res = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(res)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if (!decodedToken) {
      response.status(401).json({
        error: "token missing of invalid",
      })
    }
    const user = request.user
    console.log("GOT USER FROM REQUEST , ", user)

    if (!user) {
      response.status(400).json({
        error: "user not found",
      })
      return null
    }

    const newblog = new Blog({
      title: body.title,
      author: user.username,
      url: body.url,
      likes: body.likes || 0,
      user: user,
    })

    const savedBlog = await newblog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const requestId = request.params.id
    try {
      const decodedToken = await jwt.verify(request.token, config.SECRET)
      if (!decodedToken) {
        response.status(401).json({
          error: "Invalid or expired token",
        })
      }
      const user = request.user
      if (!user) {
        response.status(401).json({
          error: "user not found",
        })
      }
      const correctUser = user.blogs.includes(requestId) ? true : false

      if (correctUser === false) {
        response.status(401).json({ error: "User not correct" })
      }
      const blogs = user.blogs.filter((blog) => blog.id === requestId)
      await User.findByIdAndUpdate(user.id, { blogs: blogs })
      await Blog.findByIdAndDelete(requestId)
      response.status(204).json({
        status: "deleted succesfully",
      })
    } catch (error) {
      console.log(error.name)
      next(error)
    }
  }
)

blogsRouter.put("/:id", async (request, response, next) => {
  const updateObject = request.body
  console.log(request.body)
  try {
    await Blog.findByIdAndUpdate(request.params.id, updateObject)
    response.status(200).json(updateObject)
  } catch (exception) {
    next(exception)
  }
})
module.exports = blogsRouter
