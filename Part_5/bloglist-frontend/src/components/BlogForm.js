const BlogForm = ({ Title, Url, handleTitle, handleUrl, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input value={Title} onChange={handleTitle} /> <br />
      <input value={Url} onChange={handleUrl} /> <br />
      <button type="submit">save</button> <br />
    </form>
  )
}

export default BlogForm
