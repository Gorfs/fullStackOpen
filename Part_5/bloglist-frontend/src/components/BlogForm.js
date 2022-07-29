import { useState } from "react"

const BlogForm = ({ handleSubmit }) => {
  const [Title, setTitle] = useState("")
  const [Url, setUrl] = useState("")

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <h2>Add a Blog</h2>
      name: <input value={Title} onChange={handleTitle} /> <br />
      url: <input value={Url} onChange={handleUrl} /> <br />
      <button type="submit">save</button> <br />
      <br />
    </form>
  )
}

export default BlogForm
