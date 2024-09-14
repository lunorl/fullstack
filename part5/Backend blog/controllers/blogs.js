const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const usersRouter = require('./users')
const userExtractor = require('../utils/middleware').userExtractor

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  let user = request.user
  if (!user) {
    console.log(request.body.user)   
    user = request.body.user
  }
  if (!user ) {
    return response.status(403).json({ error: 'user missing' })
  }  
  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }   

  blog.likes = blog.likes | 0
  if (!user.blogs) {
    console.log('m')
    user.blogs = [blog._id]
  } else {
    console.log('sm')
    user.blogs = user.blogs.concat(blog._id)
    console.log(user)
  }
  console.log(user.id)
  blog.user = user.id
  console.log('user', user)
  await User.findByIdAndUpdate(user.id, { blogs: user.blogs },
    { new: true, runValidators: true })
    console.log(User.findById(user.id))
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)
  console.log('blog', blog)
  if (!blog) {
    return response.status(204).end()
  }
  console.log(blog.user)
  console.log(user.id)
  if ( user.id.toString() !== blog.user.toString() ) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())

  await user.save()

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = router