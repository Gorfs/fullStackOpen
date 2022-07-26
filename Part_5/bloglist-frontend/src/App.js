import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Login from "./components/Login"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  //making the handeler functions for the login
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      setUsername("")
      setPassword("")
      console.log(user)
    } catch (exception) {
      console.log("Wrong credentials")
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <div>
      {user == null ? (
        <div>
          <Login
            username={username}
            password={password}
            handlePassword={handlePasswordChange}
            handleUsername={handleUsernameChange}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <h2>Welcome back {user.name}</h2>
            <p>User {user.username} is logged in</p>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
