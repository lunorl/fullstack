const Blog = require('../models/blog')
const currentBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON)
}
const initialBlogs = [
    {
        title: 'myblog',
        author: 'john 2',
        url: 'http://hiwreqsd.com',
        likes: '231'
      },
    {
        title: 'yourblog',
        author: 'roger 2',
        url: 'http://hiwdsad.com',
        likes: '23'
    }
]
const newPost = {        
    title: 'greatblog',
    author: 'random guy',
    url: 'http://erwetq.com',
    likes: '23213'}
module.exports = {
    initialBlogs, newPost, currentBlogs
}