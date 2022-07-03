const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")

const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./apiTestHelper")

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())

  await Promise.all(promiseArray)
})

test("All the blogs are returned as JSON", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  const blogs = response.body
  expect(blogs.length).toEqual(helper.initialBlogs.length)
})

test("ID is well defined as id and note _id", async () => {
  const response = await api.get("/api/blogs")
  const blog = response.body[0]
  console.log("TEST BLOG IS", blog)

  expect(blog.id).toBeDefined()
})

test("can send a valid blog to the server using POST", async () => {
  const blogObject = {
    title: "temporary item",
    author: "some author that I don't know",
    url: "http://pornhub.com",
    likes: 69420,
  }

  await api
    .post("/api/blogs")
    .send(blogObject)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")
  console.log(response.body)
  const blogs = response.body.map((n) => n.title)
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs).toContain("temporary item")
})

test("likes default to 0 if not given", async () => {
  blogObject = {
    title: "some title",
    author: "archie beales",
    url: "some url",
  }

  await api
    .post("/api/blogs")
    .send(blogObject)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")
  const blogs = response.body
  const likes = blogs.map((blog) => blog.likes)
  expect(likes[likes.length - 1]).toEqual(0)
})

test("if no url or title then responds with code 400 bad request", async () => {
  const blogObject = {}
  let blogObject1 = {
    title: "some title",
  }
  let blogObject2 = {
    url: "some url",
  }
  await api.post("/api/blogs").send(blogObject).expect(400)
  await api.post("/api/blogs").send(blogObject1).expect(400)
  await api.post("/api/blogs").send(blogObject2).expect(400)
})

describe("deleting objects", () => {
  test("delete an object with a valid id", async () => {
    const blogsAtStart = await api.get("/api/blogs")
    const noteId = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${noteId.id}`).expect(204)

    const blogsAtEnd = await api.get("/api/blogs")
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
  })

  test("attempt delete with bad ID", async () => {
    await api.delete(`/api/blogs/3`).expect(400)
  })
})

describe("editing objects in the DB", () => {
  test("updating an object with correct ID", async () => {
    const response = await api.get("/api/blogs")

    const ID = response.body[0].id
    const newObject = {
      title: response.body[0].title,
      author: "Thomas francois",
      url: response.body[0].url,
      likes: response.body[0].likes,
    }
    await api
      .put(`/api/blogs/${ID}`)
      .send(newObject)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("updating an object with incorect ID", async () => {
    const ID = 15
    const newObject = {
      title: "thomasas thing",
      author: "Thomas francois",
      url: "some url",
      likes: 24,
    }
    await api.put(`/api/blogs/${ID}`).send(newObject).expect(400)
  })
})
