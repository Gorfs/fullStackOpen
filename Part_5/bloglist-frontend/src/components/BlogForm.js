import { useState, forwardRef, useImperativeHandle } from "react"

const BlogForm = forwardRef(({ handleSubmit }, refs) => {
  const [Title, setTitle] = useState("")
  const [Url, setUrl] = useState("")

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  useImperativeHandle(refs, () => {
    return {
      title: Title,
      url: Url,
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Blog</h2>
      name: <input value={Title} onChange={handleTitle} /> <br />
      url: <input value={Url} onChange={handleUrl} /> <br />
      <button type="submit">save</button> <br />
      <br />
    </form>
  )
})

export default BlogForm
