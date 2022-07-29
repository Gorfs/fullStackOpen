import { useState, forwardRef, useImperativeHandle } from "react"

const Blog = forwardRef(({ blog, handleBlogLike, userId }, refs) => {
  const [details, setDetails] = useState(false) // is a boolean, true for details, false for less details on the blog post

  // setting up the styles for each blog object
  const styles = {
    border: "black 2px solid",
    backgroundColor: "#D0D0D0",
    color: "black",
    marginTop: 5,
    padding: 10,
  }

  // the function that is returned from the ref
  const toggleView = () => {
    console.log(blog.user.id, userId)
    setDetails(!details)
  }

  // if the ref is called the function that toggles the view is called
  useImperativeHandle(refs, () => {
    return {
      toggleView,
    }
  })

  // rendering elements conditionally on the details state
  if (details) {
    return (
      <div style={styles}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={() => handleBlogLike(blog)}>Like</button>
        </p>

        <p>{blog.user.username}</p>
        {blog.user.id === userId ? (
          <div>
            <button>delete</button>
          </div>
        ) : (
          <div></div>
        )}
        <button onClick={toggleView}>hide</button>
      </div>
    )
  }
  return (
    <div style={styles}>
      {blog.title} {blog.author}
      <button onClick={toggleView}>View</button>
    </div>
  )
})

export default Blog
