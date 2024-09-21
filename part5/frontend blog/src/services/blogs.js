import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const post = async (info) => {
  const request = await axios.post(baseUrl, info)
  console.log('rsadasd')
  return request.data
}
const updateLikes = async (blog) => {
  console.log('blog', blog)
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  console.log('request', request)
  return request.data
}
const remove = async (user, blog) => {
  console.log(user)
  const b = {user: user}
  const request = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
  return request.data
}

export default { getAll, post , updateLikes, remove }