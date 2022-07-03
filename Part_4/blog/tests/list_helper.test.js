const listHelper = require("../utils/list_helper")
const logger = require("../utils/logger")
const supertest = require("supertest")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "1st element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "2nd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "3rd element in the list",
      author: "Archie beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 20,
      __v: 0,
    },
  ]
  const emptyArray = []

  test("TEST | ARRAY WITH ONE ITEM", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("TEST | EMPTY ARRAY", () => {
    const result = listHelper.totalLikes(emptyArray)
    expect(result).toBe(0)
  })

  test("TEST | ARRAY WITH 3 ITEMS", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(35)
  })
})

describe("most liked blog", () => {
  const emptyArr = []
  const arrWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]
  const arrWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "1st element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "2nd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "3rd element in the list",
      author: "Archie beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 20,
      __v: 0,
    },
  ]

  test("TEST | EMPTY ARRAY", () => {
    const result = listHelper.favoriteBlog(emptyArr)
    expect(result).toBe(null)
  })

  test("TEST | ARRAY WITH ONE ELEMENT", () => {
    const result = listHelper.favoriteBlog(arrWithOneBlog)
    expect(result).toBe(arrWithOneBlog[0])
  })

  test("TEST | ARRAY WITH MULTIPLE ELEMENTS", () => {
    logger.info("arr is ", arrWithMultipleBlogs)
    const result = listHelper.favoriteBlog(arrWithMultipleBlogs)
    expect(result).toBe(arrWithMultipleBlogs[2])
  })
})

describe("Most blogs written", () => {
  const emptyArr = []
  const arrWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]
  const arrWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "1st element in the list",
      author: "Adam Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "2nd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "3rd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 20,
      __v: 0,
    },
  ]

  test("TEST | EMPTRY ARR", () => {
    const result = listHelper.mostBlogs(emptyArr)
    expect(result).toBe(null)
  })

  test("TEST | ARR WITH ONE BLOG", () => {
    const result = listHelper.mostBlogs(arrWithOneBlog)
    expect(result).toBe("Archie Beales")
  })

  test("TEST | ARR WITH MULTIPLE BLOGS", () => {
    const result = listHelper.mostBlogs(arrWithMultipleBlogs)
    expect(result).toBe("Archie Beales")
  })
})

describe("Most likes received", () => {
  const emptyArr = []
  const arrWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ]
  const arrWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "1st element in the list",
      author: "Adam Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "2nd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "3rd element in the list",
      author: "Archie Beales",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 20,
      __v: 0,
    },
  ]

  test("TEST | EMPTRY ARR", () => {
    const result = listHelper.mostLikes(emptyArr)
    expect(result).toBe(null)
  })

  test("TEST | ARR WITH ONE BLOG", () => {
    const result = listHelper.mostLikes(arrWithOneBlog)
    expect(result).toBe("Archie Beales")
  })

  test("TEST | ARR WITH MULTIPLE BLOGS", () => {
    const result = listHelper.mostLikes(arrWithMultipleBlogs)
    expect(result).toBe("Archie Beales")
  })
})
