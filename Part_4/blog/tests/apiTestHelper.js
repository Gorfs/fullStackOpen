const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "1st blog",

    url: "http://gorfs.github.io/portfolio",
    likes: 4,
  },
  {
    title: "2nd blog",

    url: "http://gorfs.github.io/portfolio",
    likes: 5,
  },
  {
    title: "3nd blog",

    url: "http://gorfs.github.io/portfolio",
    likes: 8,
  },
]

const initialUsers = [
  {
    username: "root",
    name: "Archie Beales",
    password: "Gorfgorf1",
  },
  {
    username: "Gorfgorf1",
    name: "Archie Beales",
    password: "Gorfgorf1",
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  blogsInDb,
  usersInDb,
  initialBlogs,
  initialUsers,
}
