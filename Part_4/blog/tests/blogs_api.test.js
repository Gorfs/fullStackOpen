const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")

const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./apiTestHelper")
const config = require("../utils/config")
const jwt = require("jsonwebtoken")

beforeEach(async () => {
  //initialising the database
  await User.deleteMany({})
  await Blog.deleteMany({})
  // need to make it so the blogs are given ids in the future

  let tempArr = []
  for (let j = 0; j < helper.initialUsers.length; j++) {
    newUser = {
      username: helper.initialUsers[j].username,
      password: helper.initialUsers[j].password,
      name: helper.initialUsers[j].name,
    }
    await api.post("/api/users").send(newUser)
  }

  const users = await User.find({})
  for (let i = 0; i < helper.initialBlogs.length; i++) {
    newObject = {
      title: helper.initialBlogs[i].title,
      user: users[0].id,
      url: helper.initialBlogs[i].url,
      likes: helper.initialBlogs[i].likes,
    }

    await api.post("/api/blogs").send(newObject) //.set({ Authorization: token })
  }
})

//in the database there is already some users and some blogs already put in to test with
describe("basic check of JSON return format and ID check", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs have id property named id instead of _id", async () => {
    const response = await api.get("/api/blogs")
    const ids = response.body.map((blog) => blog.id)
    for (const id of ids) {
      expect(id).toBeDefined()
    }
  })
})

describe("adding blogs", () => {
  beforeAll(async () => {
    const user = { username: "root", password: "Gorfgorf1" }
    return jwt.sign(user, config.SECRET)
  })

  test("Can add a blog with correct details", async () => {
    const newBlog = {
      title: "someblog",
      url: "someurl",
      likes: 0,
    }
  })
})
