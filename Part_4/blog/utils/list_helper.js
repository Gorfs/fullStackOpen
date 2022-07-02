const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let count = 0
  blogs.map((blog) => {
    count += blog.likes
  })
  return count
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0 || !blogs) {
    return null
  }
  let mostLikedBlog = blogs[0]
  blogs.map((blog) => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  })
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0 || !blogs) {
    return null
  }
  //making an object that contains the name of all the authors and the total number of blogs each one has written
  let blogAuthors = []
  blogs.map((blog) => {
    console.log(blogAuthors, blog.author)
    console.log(blogAuthors.find((author) => author.name === blog.author))
    if (
      blogAuthors.find((author) => author.name === blog.author) != undefined
    ) {
      //the author is already in the list
      blogAuthors.find((author) => author.name === blog.author).blogs += 1
    } else {
      //the author is not in the author list
      blogAuthors.push({
        name: blog.author,
        blogs: 0,
      }) //initialising the value for the author
    }
  })
  console.log("authors are ", blogAuthors)
  let max_author = blogAuthors[0]

  blogAuthors.map((author) => {
    if (author.blogs > max_author.blogs) {
      max_author = author
    }
  })

  return max_author.name
}

const mostLikes = (blogs) => {
  if (blogs.length === 0 || !blogs) {
    return null
  }
  //making an object that contains the name of all the authors and the total number of blogs each one has written
  let blogAuthors = []
  blogs.map((blog) => {
    console.log(blogAuthors, blog.author)
    console.log(blogAuthors.find((author) => author.name === blog.author))
    if (
      blogAuthors.find((author) => author.name === blog.author) != undefined
    ) {
      //the author is already in the list
      blogAuthors.find((author) => author.name === blog.author).likes +=
        blog.likes
    } else {
      //the author is not in the author list
      blogAuthors.push({
        name: blog.author,
        likes: 0,
      }) //initialising the value for the author
    }
  })
  console.log("authors are ", blogAuthors)
  let max_author = blogAuthors[0]

  blogAuthors.map((author) => {
    if (author.likes > max_author.likes) {
      max_author = author
    }
  })

  return max_author.name
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
