const Blog = require('../models/blog')
const currentBlogs = async () => {
    return await Blog.find({})
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
    url: 'http://erwetq.com'}
module.exports = {
    initialBlogs, newPost, currentBlogs
}