import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const sendBlog = async (blog) => {
  //the blog parameter should be an object that contains at least a title and url
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  if (token == null) {
    console.log("token is currently null")
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}
export default { getAll, sendBlog, setToken, updateBlog, deleteBlog }
