const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "1st blog",
    author: "Archie Beales",
    url: "http://gorfs.github.io/portfolio",
    likes: 4,
  },
  {
    title: "2nd blog",
    author: "Archie Beales",
    url: "http://gorfs.github.io/portfolio",
    likes: 5,
  },
  {
    title: "3nd blog",
    author: "Adam beales Beales",
    url: "http://gorfs.github.io/portfolio",
    likes: 8,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  blogsInDb,
  initialBlogs,
}
