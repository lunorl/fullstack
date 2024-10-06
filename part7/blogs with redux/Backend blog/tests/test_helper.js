const Blog = require('../models/blog')
const User = require('../models/users')
const currentBlogs = async () => {
    return await Blog.find({})
}
const currentUsers = async () => {
    return await User.find({})
}
const initialUsers = [
    {
    "username":"el",
    "name":"elie",
    "password":"serty"
},
{
    "username":"john",
    "name":"johnnie",
    "password":"serty"
}
]
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
    initialBlogs, newPost, currentBlogs, currentUsers, initialUsers
}