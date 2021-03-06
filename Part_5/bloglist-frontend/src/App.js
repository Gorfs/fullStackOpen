import { useState, useEffect, useRef } from "react"
import Toggleable from "./components/Toggleable"
import Blog from "./components/Blog"
import Login from "./components/Login"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  //setting up the states for the site
  const toggleRef = useRef()
  const blogRef = useRef()
  const blogFormRef = useRef()
  const [notification, setNotification] = useState({
    message: null,
    color: "green",
  }) // first element should be the message and the second message should be the color of the notification
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  //making the hook that will update all the blogs
  const updateAll = () => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          return b.likes - a.likes
        })
      )
    )
  }

  //making the handeler functions for the login
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      setUsername("")
      setPassword("")
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      await setNotification({
        message: "user has been logged in",
        color: "green",
      })
      setTimeout(() => setNotification({ message: null, color: "green" }), 4000)
    } catch (exception) {
      console.log("Wrong credentials")
      setNotification({ message: "Wrong username or password", color: "red" })
      setTimeout(() => setNotification({ message: null, color: "green" }), 4000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
    setNotification({ message: "user has been logged out", color: "green" })
    setTimeout(() => setNotification({ message: null, color: "green" }), 4000)
  }

  //making the function that deals with a blog being added
  const handleBlogSubmit = async (event) => {
    //should be only called if a user is logged in already
    event.preventDefault()
    try {
      const res = blogFormRef.current
      const blog = { title: res.title, url: res.url, user: user.token }
      setBlogTitle("")
      setBlogUrl("")
      toggleRef.current.toggleVisible()
      await blogService.setToken(user.token)
      const ress = await blogService.sendBlog(blog)
      setBlogs(blogs.concat(ress))
      setNotification({
        message: `${res.title} has been added`,
        color: "green",
      })
      setTimeout(() => setNotification({ message: null, color: "green" }), 4000)
    } catch (exception) {
      console.log(exception)
    }
  }
  const handleBlogLike = async (blog) => {
    //making a new blog object to be the updated blog
    const updatedBlog = {
      user: blog.user.id,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      title: blog.title,
    }
    console.log(updatedBlog)
    await blogService.updateBlog(updatedBlog) //sending the blog to the blogservice
    updateAll() // updates all the blogs to be rerendered
  }
  const handleBlogDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return null
    }
    console.log(`attempting deletion of blog ${blogId}`)
    await blogService.setToken(user.token)
    const response = await blogService.deleteBlog(blogId)
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  useEffect(() => {
    updateAll()
  }, [])

  //making the effect hook to check to see if the user already has a token for the site
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  return (
    <div>
      <Notification message={notification.message} color={notification.color} />
      {user == null ? (
        <div>
          <Login
            username={username}
            password={password}
            handlePassword={handlePasswordChange}
            handleUsername={handleUsernameChange}
            handleSubmit={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {/* <h2>Welcome back {user.name}</h2> */}
            <p>
              User {user.username} is logged in
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          <Toggleable
            showMessage="Add Blog"
            cancelMessage="cancel"
            ref={toggleRef}
          >
            <BlogForm handleSubmit={handleBlogSubmit} ref={blogFormRef} />
          </Toggleable>

          {blogs.map((blog) => (
            <Blog
              ref={blogRef}
              key={blog.id}
              blog={blog}
              handleBlogLike={handleBlogLike}
              userId={user.id}
              handleBlogDelete={handleBlogDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
