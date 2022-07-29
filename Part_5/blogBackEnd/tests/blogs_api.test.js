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

  for (let j = 0; j < helper.initialUsers.length; j++) {
    newUser = {
      username: helper.initialUsers[j].username,
      password: helper.initialUsers[j].password,
      name: helper.initialUsers[j].name,
    }

    await api.post("/api/users").send(newUser)
  }

  const users = await User.find({})
  const user = users[0]
  for (let i = 0; i < helper.initialBlogs.length; i++) {
    const token = jwt.sign(user.toJSON(), config.SECRET)
    newObject = {
      title: helper.initialBlogs[i].title,
      user: users[0]._id,
      url: helper.initialBlogs[i].url,
      likes: helper.initialBlogs[i].likes,
    }
    await api
      .post("/api/blogs")
      .send(newObject)
      .set("Authorization", `Bearer ${token}`)
    const blogs = user.blogs
    User.findByIdAndUpdate(user._id, { blogs: blogs.concat(newObject) })
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
  test("Can add a blog with correct details", async () => {
    const user = await User.findOne({ username: "root" })
    const token = jwt.sign(user.toJSON(), config.SECRET)
    const newBlog = {
      title: "someblog",
      url: "someurl",
      user: user._id,
      likes: 0,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
  })
})

describe("test to log in", () => {
  test("log in with correct information goes through", async () => {
    console.log("THIS MESSAGE IS COMING FROM THE TEST")
    const user = {
      username: "root",
      password: "Gorfgorf1",
    }
    await api.post("/api/login").send(user).expect(200)
  })
  test("log in with incorrect information does not go through", async () => {
    const fakeUser = {
      username: "root",
      password: "not correct password",
    }
    await api.post("/api/login").send(fakeUser).expect(401)
  })
})
